from flask import Flask, request, jsonify
import logging
import os
from collections import Counter
from nlp.text_processing import extract_key_phrases, preprocess_phrases

# Initialize Flask app
app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Load configuration from environment variables
PORT = os.getenv('PORT', 4000)


@app.route('/extract_key_phrases', methods=['POST'])
def extract_key_phrases_route():
    # Validate request format and presence of 'text'
    if not request.json or 'text' not in request.json:
        logging.error("Missing text object in request")
        return jsonify({"error": "Missing text object in request"}), 400

    text = request.json['text']

    try:
        # Extract key phrases from the text
        raw_key_phrases = extract_key_phrases(text)
        # Preprocess phrases for normalization, deduplication, and filtering
        processed_phrases = preprocess_phrases(raw_key_phrases)
    except Exception as e:
        logging.error(f"Error during key phrase extraction: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

    # Print the processed key phrases
    logging.info(f"Processed key phrases: {processed_phrases}")

    # Return the processed key phrases
    return jsonify({"key_phrases": processed_phrases}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(PORT))
