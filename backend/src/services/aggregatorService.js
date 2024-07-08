const axios = require("axios");
const Video = require("../models/AggregatedContent");
require("dotenv").config();

const languageCodes = {
  swahili: "sw",
  // Add other languages and their ISO 639-1 codes as needed
};

const fetchYouTubeData = async (query, language, maxResults = 100) => {
  try {
    // Convert language to valid ISO 639-1 code if necessary
    const isoLanguage = languageCodes[language.toLowerCase()] || language;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&maxResults=${maxResults}&relevanceLanguage=${isoLanguage}&key=${
      process.env.YOUTUBE_API_KEY
    }`;
    const response = await axios.get(url);
    return response.data.items.map((item) => ({
      ...item,
      language: isoLanguage,
    }));
  } catch (error) {
    console.error(`Failed to fetch YouTube data: ${error.message}`);
    throw error;
  }
};

const getVideoDetails = async (videoId) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`;
    const response = await axios.get(url);
    if (response.data.items.length === 0) throw new Error("Video not found");
    return response.data.items[0];
  } catch (error) {
    console.error(
      `Failed to fetch video details for videoId ${videoId}: ${error.message}`
    );
    throw error; // Rethrow to handle it in the calling function
  }
};

const getCategoryNameById = async (categoryId) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&id=${categoryId}&key=${process.env.YOUTUBE_API_KEY}`;
    const response = await axios.get(url);
    if (response.data.items.length === 0) throw new Error("Category not found");
    return response.data.items[0].snippet.title; // Return the category name
  } catch (error) {
    console.error(
      `Failed to fetch category name for categoryId ${categoryId}: ${error.message}`
    );
    throw error; // Rethrow to handle it in the calling function
  }
};

const storeVideoData = async (videos, language) => {
  for (const video of videos) {
    try {
      // Check if the video already exists in the database
      const existingVideo = await Video.findOne({ videoId: video.id.videoId });
      if (existingVideo) {
        console.log(
          `Video with ID: ${video.id.videoId} already exists. Skipping...`
        );
        continue; // Skip to the next video if this one already exists
      }

      const videoDetails = await getVideoDetails(video.id.videoId);
      const categoryName = await getCategoryNameById(
        videoDetails.snippet.categoryId
      );

      const videoData = {
        videoId: video.id.videoId,
        title: videoDetails.snippet.title,
        description: videoDetails.snippet.description,
        publishedAt: videoDetails.snippet.publishedAt,
        channelId: videoDetails.snippet.channelId,
        categoryId: videoDetails.snippet.categoryId,
        category: categoryName,
        tags: videoDetails.snippet.tags,
        duration: videoDetails.contentDetails.duration,
        viewCount: videoDetails.statistics.viewCount,
        likeCount: videoDetails.statistics.likeCount,
        language: video.language, // Save the language as part of the video data
      };
      await Video.create(videoData);
    } catch (error) {
      console.error(
        `Failed to store video data for videoId ${video.id.videoId}: ${error.message}`
      );
      // Optionally, handle the error (e.g., retry logic, logging, etc.)
    }
  }
};

// Get all videos
const getAllVideos = async () => {
  return Video.find({});
};

// Delete all videos
const deleteAllVideos = async () => {
  return Video.deleteMany({});
};

module.exports = { fetchYouTubeData, storeVideoData, getAllVideos, deleteAllVideos};
