const axios = require("axios");
const AggregatedContent = require("../models/AggregatedContent");
require("dotenv").config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const PYTHON_SERVICE_URL =
  process.env.PYTHON_SERVICE_URL || "http://localhost:5000/extract_key_phrases";

const AggregatorService = {
  fetchYouTubeData: async (language) => {
    if (!language) throw new Error("Language parameter is required");

    const youtubeAPIUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&type=video&q=${encodeURIComponent(
      "Learn " + language
    )}&key=${YOUTUBE_API_KEY}`;

    const response = await axios.get(youtubeAPIUrl);
    if (!response.data.items.length)
      throw new Error("No data fetched from YouTube");

    return response.data.items.map((item) => ({
      kind: item.kind,
      etag: item.etag,
      videoId: item.id.videoId,
      channelId: item.snippet.channelId,
      playlistId: item.id.playlistId || null,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      liveBroadcastContent: item.snippet.liveBroadcastContent,
      tags: item.snippet.tags || [],
      language: language,
    }));
  },

  saveToMongoDB: async (videos) => {
    console.log(
      `Processing videos with IDs: ${videos.map((v) => v.videoId).join(", ")}`
    );
    for (const video of videos) {
      const existingVideo = await AggregatedContent.findOne({
        videoId: video.videoId,
      });
      if (existingVideo) {
        console.log(
          `Video with ID: ${video.videoId} already exists. Skipping...`
        );
      } else {
        console.log(
          `Enriching video with ID: ${video.videoId} with key phrases as tags.`
        );
        // Use an arrow function or bind this explicitly
        await AggregatorService.enrichVideoWithKeyPhrases(video);
        console.log(`Saving enriched video with ID: ${video.videoId}`);
        await new AggregatedContent(video).save();
      }
    }
    console.log("Videos processing completed.");
  },

  enrichVideoWithKeyPhrases: async function (video) {
    const keyPhrases = await this.extractKeyPhrases({
      title: video.title,
      description: video.description,
    });
    // Assuming keyPhrases is an array of strings
    video.tags = video.tags.concat(keyPhrases); // Add key phrases to video tags
  },

  extractKeyPhrases: async ({ title, description }) => {
    console.log(
      `Extracting key phrases for title: ${title}, description: ${description}`
    );
    if (!title || !description)
      throw new Error(
        "Title and description are required for key phrase extraction"
      );
    try {
      const response = await axios.post(PYTHON_SERVICE_URL, {
        text: `${title} ${description}`,
      });
      return response.data.key_phrases;
    } catch (error) {
      console.error(
        "Error extracting key phrases:",
        error.response ? error.response.data : error.message
      );
      throw error; // Re-throw the error to be caught by the calling function
    }
  },

  getAggregatedContent: async () => {
    return await AggregatedContent.find();
  },
};

module.exports = AggregatorService;
