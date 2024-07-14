from flask import Flask, request, jsonify
from recommendation import hybrid_recommendations
from preprocess import preprocess_video_data
import pandas as pd
import os
from dotenv import load_dotenv
import logging
import requests
import json

# Load environment variables from .env file
load_dotenv(os.path.join(os.getcwd(), '.env'))

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load backend URL from environment variables
BACKEND_URL = os.getenv('BACKEND_URL')

# Preferred languages for filtering videos
PREFERRED_LANGUAGES = ['en', 'es', 'fr']

# Fetch video data from Node.js backend


def fetch_video_data():
    try:
        response = requests.get(f"{BACKEND_URL}/api/aggregator/videos")
        if response.status_code == 200:
            video_data = pd.DataFrame(response.json())
            logging.debug("Fetched video data: %s", video_data.head())
            return video_data
        else:
            logging.error("Failed to fetch video data: HTTP %s",
                          response.status_code)
            return pd.DataFrame()  # Return empty DataFrame in case of error
    except Exception as e:
        logging.error("Error fetching video data: %s", e)
        return pd.DataFrame()

# Fetch user data from Node.js backend


def fetch_user_data():
    try:
        response = requests.get(f"{BACKEND_URL}/api/users/allUserData")
        if response.status_code == 200:
            user_data = pd.DataFrame(response.json())
            logging.debug("Fetched user data: %s", user_data.head())
            return user_data
        else:
            logging.error("Failed to fetch user data: HTTP %s",
                          response.status_code)
            return pd.DataFrame()  # Return empty DataFrame in case of error
    except Exception as e:
        logging.error("Error fetching user data: %s", e)
        return pd.DataFrame()


@app.route('/recommendations/<user_id>', methods=['GET'])
def get_recommendations(user_id):
    try:
        logging.debug(
            "Received request for user_id: %s with query params: %s", user_id, request.args)

        user_profile_str = request.args.get('profile')
        query = request.args.get('query', '').strip()

        logging.debug(f"Received request for user_id: {user_id}")
        logging.debug(f"User profile: {user_profile_str}")
        logging.debug(f"Query: {query}")

        # Convert user_profile from JSON string to dict
        user_profile_data = json.loads(user_profile_str)
        user_profile = user_profile_data.get('userProfile', {})

        # Ensure interactions key exists
        if 'interactions' not in user_profile:
            user_profile['interactions'] = []

        video_data = fetch_video_data()
        if video_data.empty:
            return jsonify({'error': 'Failed to fetch video data'}), 500
        video_data = preprocess_video_data(video_data, PREFERRED_LANGUAGES)

        user_data = fetch_user_data()
        if user_data.empty:
            return jsonify({'error': 'Failed to fetch user data'}), 500

        recommendations = hybrid_recommendations(
            user_id, user_profile, user_data, video_data, query)

        logging.debug(f"Recommended Video IDs and Scores: {recommendations}")

        return jsonify({'recommendations': recommendations})
    except Exception as e:
        logging.error("Error in get_recommendations: %s", e)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
