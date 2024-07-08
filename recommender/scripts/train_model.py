import pandas as pd
from classification import classify_videos
import joblib

# Load the cleaned dataset
video_data = pd.read_csv('models/cleaned_video_data.csv')

# Train the classification model
model, tfidf = classify_videos(video_data)

# Save the model and TF-IDF vectorizer
joblib.dump(model, 'models/video_classifier.pkl')
joblib.dump(tfidf, 'models/tfidf_vectorizer.pkl')
