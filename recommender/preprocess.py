# preprocess.py
import re
import pandas as pd
from langdetect import detect, LangDetectException


def clean_text(text):
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    text = text.lower()  # Convert to lowercase
    return text


def normalize_duration(duration):
    match = re.match(r'PT(\d+H)?(\d+M)?(\d+S)?', duration)
    hours = int(match.group(1)[:-1]) if match.group(1) else 0
    minutes = int(match.group(2)[:-1]) if match.group(2) else 0
    seconds = int(match.group(3)[:-1]) if match.group(3) else 0
    return hours * 3600 + minutes * 60 + seconds


def process_tags(tags):
    if isinstance(tags, list):
        return [clean_text(tag) for tag in tags]
    return []


def filter_language(text, preferred_languages):
    try:
        detected_language = detect(text)
        if detected_language in preferred_languages:
            return True
    except LangDetectException:
        return False
    return False


def is_educational(category_id, combined_text, tags):
    if category_id == "27":  # Education category
        return True
    # Additional heuristic checks for educational content
    educational_keywords = ["tutorial", "lesson",
                            "how to", "course", "education", "learning"]
    return any(keyword in combined_text.lower() for keyword in educational_keywords)


def preprocess_video_data(video_data, preferred_languages):
    # Clean text fields
    video_data['title'] = video_data['title'].apply(clean_text)
    video_data['description'] = video_data['description'].apply(clean_text)

    # Combine title and description
    video_data['combined_text'] = video_data['title'] + \
        ' ' + video_data['description']

    # Normalize duration
    video_data['duration'] = video_data['duration'].apply(normalize_duration)

    # Process tags
    video_data['tags'] = video_data['tags'].apply(process_tags)

    # Filter by language
    video_data = video_data[video_data['description'].apply(
        lambda x: filter_language(x, preferred_languages))]

    # Filter out non-educational videos
    video_data = video_data[video_data.apply(lambda row: is_educational(
        row['categoryId'], row['combined_text'], row['tags']), axis=1)]

    # Handle missing values
    video_data.fillna({'viewCount': 0, 'likeCount': 0,
                      'categoryId': '0'}, inplace=True)

    # Rename videoId to video_id for consistency
    video_data = video_data.rename(columns={'videoId': 'video_id'})

    return video_data
