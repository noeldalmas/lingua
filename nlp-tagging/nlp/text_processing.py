import spacy
from spacy.cli import download
import logging

# Define a list of irrelevant phrases for filtering
IRRELEVANT_PHRASES = {'your FREE gifts', 'the month'}


def load_spacy_model(model_name="en_core_web_sm"):
    try:
        # Attempt to load the specified SpaCy model
        return spacy.load(model_name)
    except IOError:
        logging.info(f"Downloading SpaCy model: {model_name}")
        download(model_name)
        return spacy.load(model_name)


def extract_key_phrases(text):
    # Early return for specific error text
    if text.startswith("Error"):
        return [text]

    # Load the SpaCy model
    nlp = load_spacy_model()
    doc = nlp(text)

    # Extract and return key phrases from the text
    key_phrases = [chunk.text for chunk in doc.noun_chunks]
    return key_phrases


def preprocess_phrases(phrases):
    # Normalize case and remove duplicates
    phrases = [phrase.lower() for phrase in phrases]
    phrases = list(set(phrases))

    # Filter out irrelevant phrases
    phrases = [phrase for phrase in phrases if phrase not in IRRELEVANT_PHRASES]

    # Further processing like weighting, contextual analysis, etc., can be added here

    return phrases
