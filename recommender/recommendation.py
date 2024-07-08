import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict
from sklearn.feature_extraction.text import TfidfVectorizer
import logging

# Function to calculate user similarity matrix based on collaborative filtering


def calculate_user_similarity(user_profile):
    interactions = pd.DataFrame(user_profile['interactions'])
    if interactions.empty:
        return pd.DataFrame()  # Return empty DataFrame if no interactions

    # Add a user_id column to the interactions DataFrame
    interactions['user_id'] = user_profile['_id']

    # Create a matrix with users as rows and videos as columns, fill with user ratings (watch time)
    user_video_matrix = interactions.pivot(
        index='user_id', columns='video_id', values='watch_time').fillna(0)

    # Calculate cosine similarity between users
    user_similarity = cosine_similarity(user_video_matrix)
    user_similarity_df = pd.DataFrame(
        user_similarity, index=user_video_matrix.index, columns=user_video_matrix.index)

    return user_similarity_df

# Function to calculate item similarity matrix based on content-based filtering


def calculate_item_similarity(video_data):
    # Ensure 'videoId' is renamed to 'video_id' for consistency
    video_data = video_data.rename(columns={'videoId': 'video_id'})

    # Use TF-IDF vectorizer to convert combined title and description into vectors
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(video_data['combined_text'])

    # Calculate cosine similarity between items
    item_similarity = cosine_similarity(tfidf_matrix)
    item_similarity_df = pd.DataFrame(
        item_similarity, index=video_data['video_id'], columns=video_data['video_id'])

    return item_similarity_df

# Function to generate collaborative filtering recommendations


def collaborative_filtering_recommendations(user_id, user_similarity, user_profile):
    if user_similarity.empty:
        return []  # Return empty list if no user similarity data

    # Find similar users
    similar_users = user_similarity.loc[user_id].sort_values(
        ascending=False).index[1:]

    # Generate recommendations based on similar users' preferences
    recommendations = defaultdict(float)
    for sim_user in similar_users:
        sim_user_data = pd.DataFrame(user_profile['interactions'])
        sim_user_data = sim_user_data[sim_user_data['user_id'] == sim_user]
        for _, row in sim_user_data.iterrows():
            recommendations[row['video_id']] += row['watch_time'] * \
                user_similarity.loc[user_id, sim_user]

    # Sort recommendations by score
    sorted_recommendations = sorted(
        recommendations.items(), key=lambda x: x[1], reverse=True)
    return sorted_recommendations

# Function to generate content-based filtering recommendations


def content_based_filtering_recommendations(user_id, user_profile, item_similarity):
    interactions = pd.DataFrame(user_profile['interactions'])
    if interactions.empty:
        return []  # Return empty list if no interactions

    # Add a user_id column to the interactions DataFrame
    interactions['user_id'] = user_id

    # Get user's watched videos
    user_watched_videos = interactions[interactions['user_id']
                                       == user_id]['video_id']

    # Generate recommendations based on item similarity
    recommendations = defaultdict(float)
    for video_id in user_watched_videos:
        if video_id in item_similarity.index:
            similar_videos = item_similarity.loc[video_id].sort_values(
                ascending=False).index[1:]
            for sim_video in similar_videos:
                recommendations[sim_video] += item_similarity.loc[video_id, sim_video]

    # Sort recommendations by score
    sorted_recommendations = sorted(
        recommendations.items(), key=lambda x: x[1], reverse=True)
    return sorted_recommendations

# Function to generate content-based filtering recommendations based on query


def content_based_filtering_recommendations_query(query, video_data):
    # Ensure 'videoId' is renamed to 'video_id' for consistency
    video_data = video_data.rename(columns={'videoId': 'video_id'})

    # Use TF-IDF vectorizer to convert combined title and description into vectors
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(video_data['combined_text'])

    # Transform the query
    query_vec = tfidf_vectorizer.transform([query])

    # Calculate cosine similarity between the query and items
    similarity_scores = cosine_similarity(query_vec, tfidf_matrix).flatten()
    logging.debug(
        f"Content-based filtering (query) similarity scores: {similarity_scores}")

    # Sort recommendations by score
    sorted_indices = np.argsort(similarity_scores)[::-1]
    sorted_recommendations = video_data['video_id'].iloc[sorted_indices]
    return list(zip(sorted_recommendations.tolist(), similarity_scores[sorted_indices]))

# Function to combine collaborative and content-based recommendations


def hybrid_recommendations(user_id, user_profile, user_data, video_data, query=None):
    # Ensure 'videoId' is renamed to 'video_id' for consistency
    video_data = video_data.rename(columns={'videoId': 'video_id'})

    if query:
        # If a query is provided, use content-based filtering on the query
        query_recommendations = content_based_filtering_recommendations_query(
            query, video_data)
        return query_recommendations

    # Calculate user and item similarities
    user_similarity = calculate_user_similarity(user_profile)
    item_similarity = calculate_item_similarity(video_data)

    # Generate CF and CBF recommendations
    cf_recommendations = collaborative_filtering_recommendations(
        user_id, user_similarity, user_profile)
    cbf_recommendations = content_based_filtering_recommendations(
        user_id, user_profile, item_similarity)

    # Combine recommendations
    combined_recommendations = []
    cf_set = {video_id: score for video_id, score in cf_recommendations}
    cbf_set = {video_id: score for video_id, score in cbf_recommendations}
    intersection = set(cf_set.keys()) & set(cbf_set.keys())

    # Recommendations appearing in both lists take precedence
    for video_id in intersection:
        combined_recommendations.append(
            (video_id, cf_set[video_id] + cbf_set[video_id]))

    # Add remaining recommendations from CF and CBF lists alternately
    remaining_cf = [
        (vid, score) for vid, score in cf_recommendations if vid not in intersection]
    remaining_cbf = [
        (vid, score) for vid, score in cbf_recommendations if vid not in intersection]

    combined_recommendations.extend(remaining_cf)
    combined_recommendations.extend(remaining_cbf)

    # Sort the combined recommendations by score
    combined_recommendations.sort(key=lambda x: x[1], reverse=True)

    # Use user profile to filter and sort recommendations
    combined_recommendations = filter_and_sort_by_profile(
        combined_recommendations, user_profile, video_data)

    return combined_recommendations

# Function to filter and sort recommendations based on user profile


def filter_and_sort_by_profile(recommendations, user_profile, video_data):
    preferred_languages = user_profile.get(
        'preferences', {}).get('preferredLanguages', [])
    preferred_genres = user_profile.get(
        'preferences', {}).get('preferredGenres', [])

    # Filter recommendations by preferred languages
    filtered_recommendations = [
        (vid, score) for vid, score in recommendations
        if video_data.loc[video_data['video_id'] == vid, 'language'].values[0] in preferred_languages
    ]

    # Sort by preferred genres and other criteria
    genre_scores = {vid: score for vid, score in filtered_recommendations}
    for genre in preferred_genres:
        for vid, score in filtered_recommendations:
            if genre in video_data.loc[video_data['video_id'] == vid, 'tags'].values[0]:
                genre_scores[vid] += score

    sorted_recommendations = sorted(
        genre_scores.items(), key=lambda item: item[1], reverse=True)

    return sorted_recommendations
