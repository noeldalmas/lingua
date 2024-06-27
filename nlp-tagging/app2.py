from flask import Flask, request, jsonify
import os
from nlp.text_processing import extract_key_phrases
from nlp.speech_recognition import speech_to_text
from pytube import YouTube
from tempfile import NamedTemporaryFile
import subprocess
import requests

app = Flask(__name__)


def is_url_accessible(url):
    try:
        response = requests.head(url, allow_redirects=True, timeout=5)
        return response.status_code == 200
    except requests.RequestException:
        return False


def convert_to_wav(audio_file_path):
    wav_file_path = audio_file_path.rsplit('.', 1)[0] + ".wav"
    try:
        command = ['ffmpeg', '-i', audio_file_path, '-acodec',
                   'pcm_s16le', '-ar', '16000', wav_file_path]
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        print(f"ffmpeg error: {e}")
        return None
    return wav_file_path


@app.route('/extract_key_phrases', methods=['POST'])
def extract_key_phrases_from_video_route():
    if not request.json or 'text' not in request.json:
        return jsonify({"error": "Missing text object in request"}), 400
    if 'url' not in request.json['text']:
        return jsonify({"error": "Missing video_url in text object"}), 400

    video_url = request.json['text']['url']
    if not is_url_accessible(video_url):
        return jsonify({"error": "URL is not accessible"}), 400

    title = request.json['text'].get('title', '')
    description = request.json['text'].get('description', '')

    print("Received request for URL:", video_url)
    try:
        yt = YouTube(video_url)
        audio_stream = yt.streams.filter(
            only_audio=True).order_by('abr').asc().first()
        with NamedTemporaryFile(delete=False, suffix='.webm') as tmp:
            audio_stream.download(output_path=tmp.name.rsplit(
                '\\', 1)[0], filename=tmp.name.rsplit('\\', 1)[1])
            audio_filename = tmp.name

        wav_filename = convert_to_wav(audio_filename)
        text = speech_to_text(wav_filename)

        os.remove(audio_filename)
        if wav_filename:
            os.remove(wav_filename)

        if text.startswith("Error"):
            return jsonify({"error": text}), 500

        text_key_phrases = extract_key_phrases(text)
        title_key_phrases = extract_key_phrases(title)
        description_key_phrases = extract_key_phrases(description)
        combined_key_phrases = list(
            set(text_key_phrases + title_key_phrases + description_key_phrases))
    except Exception as e:
        print("An error occurred:", str(e))
        return jsonify({"error": str(e)}), 500

    return jsonify({"key_phrases": combined_key_phrases}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
