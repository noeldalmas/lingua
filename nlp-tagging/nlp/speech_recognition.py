import speech_recognition as sr
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)


def speech_to_text(audio_file_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file_path) as source:
        audio_data = recognizer.record(source)
        try:
            text = recognizer.recognize_google(audio_data)
            return process_text(text)
        except sr.UnknownValueError:
            return "Error: Speech Recognition could not understand audio"
        except sr.RequestError as e:
            if "Bad Request" in str(e):
                return "Error: Bad Request - This usually indicates a problem with the audio file format or the request parameters."
            return f"Error: Could not request results from Speech Recognition service; {e}"


def process_text(text):
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(text)
    filtered_text = [word for word in word_tokens if word.lower()
                     not in stop_words]
    unique_words = list(set(filtered_text))
    return ' '.join(unique_words)


try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)
