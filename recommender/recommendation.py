# recommendation.py
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict
from sklearn.feature_extraction.text import TfidfVectorizer
import logging


def calculate_user_similarity(user_profile):
    interactions = pd.DataFrame(user_profile['interactions'])
    if interactions.empty:
        return pd.DataFrame()  # Return empty DataFrame if no interactions

    interactions['user_id'] = user_profile['_id']
    user_video_matrix = interactions.pivot(
        index='user_id', columns='videoId', values='watchTime').fillna(0)
    user_similarity = cosine_similarity(user_video_matrix)
    user_similarity_df = pd.DataFrame(
        user_similarity, index=user_video_matrix.index, columns=user_video_matrix.index)

    return user_similarity_df


def calculate_item_similarity(video_data):
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(video_data['combined_text'])
    item_similarity = cosine_similarity(tfidf_matrix)
    item_similarity_df = pd.DataFrame(
        item_similarity, index=video_data['video_id'], columns=video_data['video_id'])

    return item_similarity_df


def collaborative_filtering_recommendations(user_id, user_similarity, user_profile):
    if user_similarity.empty:
        return []

    similar_users = user_similarity.loc[user_id].sort_values(
        ascending=False).index[1:]
    recommendations = defaultdict(float)
    for sim_user in similar_users:
        sim_user_data = pd.DataFrame(user_profile['interactions'])
        sim_user_data = sim_user_data[sim_user_data['user_id'] == sim_user]
        for _, row in sim_user_data.iterrows():
            recommendations[row['videoId']] += row['watchTime'] * \
                user_similarity.loc[user_id, sim_user]

    sorted_recommendations = sorted(
        recommendations.items(), key=lambda x: x[1], reverse=True)
    return sorted_recommendations


def content_based_filtering_recommendations(user_id, user_profile, item_similarity):
    interactions = pd.DataFrame(user_profile['interactions'])
    if interactions.empty:
        return []

    interactions['user_id'] = user_id
    user_watched_videos = interactions[interactions['user_id']
                                       == user_id]['videoId']
    recommendations = defaultdict(float)
    for video_id in user_watched_videos:
        if video_id in item_similarity.index:
            similar_videos = item_similarity.loc[video_id].sort_values(
                ascending=False).index[1:]
            for sim_video in similar_videos:
                recommendations[sim_video] += item_similarity.loc[video_id, sim_video]

    sorted_recommendations = sorted(
        recommendations.items(), key=lambda x: x[1], reverse=True)
    return sorted_recommendations


def content_based_filtering_recommendations_query(query, video_data):
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(video_data['combined_text'])
    query_vec = tfidf_vectorizer.transform([query])
    similarity_scores = cosine_similarity(query_vec, tfidf_matrix).flatten()
    sorted_indices = np.argsort(similarity_scores)[::-1]
    sorted_recommendations = video_data['video_id'].iloc[sorted_indices]
    return list(zip(sorted_recommendations.tolist(), similarity_scores[sorted_indices]))


def hybrid_recommendations(user_id, user_profile, user_data, video_data, query=None):
    if query:
        query_recommendations = content_based_filtering_recommendations_query(
            query, video_data)
        return query_recommendations

    user_similarity = calculate_user_similarity(user_profile)
    item_similarity = calculate_item_similarity(video_data)

    cf_recommendations = collaborative_filtering_recommendations(
        user_id, user_similarity, user_profile)
    cbf_recommendations = content_based_filtering_recommendations(
        user_id, user_profile, item_similarity)

    combined_recommendations = []
    cf_set = {video_id: score for video_id, score in cf_recommendations}
    cbf_set = {video_id: score for video_id, score in cbf_recommendations}
    intersection = set(cf_set.keys()) & set(cbf_set.keys())

    for video_id in intersection:
        combined_recommendations.append(
            (video_id, cf_set[video_id] + cbf_set[video_id]))

    remaining_cf = [(vid, score)
                    for vid, score in cf_recommendations if vid not in intersection]
    remaining_cbf = [(vid, score)
                     for vid, score in cbf_recommendations if vid not in intersection]

    combined_recommendations.extend(remaining_cf)
    combined_recommendations.extend(remaining_cbf)

    combined_recommendations.sort(key=lambda x: x[1], reverse=True)
    combined_recommendations = filter_and_sort_by_profile(
        combined_recommendations, user_profile, video_data)

    return combined_recommendations


def filter_and_sort_by_profile(recommendations, user_profile, video_data):
    preferred_topics = user_profile.get('topics', [])

    # Filter recommendations by preferred topics
    filtered_recommendations = [(vid, score) for vid, score in recommendations
                                if any(topic in video_data.loc[video_data['video_id'] == vid, 'tags'].values[0] for topic in preferred_topics)]

    # Ensure diversity by including different categories and channels
    diverse_recommendations = {}
    for vid, score in filtered_recommendations:
        category = video_data.loc[video_data['video_id']
                                  == vid, 'categoryId'].values[0]
        if category not in diverse_recommendations or score > diverse_recommendations[category][1]:
            diverse_recommendations[category] = (vid, score)

    sorted_recommendations = sorted(
        diverse_recommendations.values(), key=lambda item: item[1], reverse=True)

    return sorted_recommendations
