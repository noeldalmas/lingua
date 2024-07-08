// aggregatorController.js

const AggregatorService = require("../services/aggregatorService");
const UserService = require("../services/userService");
const RecommenderService = require("../services/recommenderService"); // Ensure RecommenderService is required if used

const searchAndRecommend = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const query = req.body.query;
    const language = req.body.language;

    let userProfile;
    try {
      // Use UserService to fetch the user profile instead of RecommenderService
      userProfile = await UserService.findUserByIdForML(userId);
      if (!userProfile) {
        throw new Error("User profile not found");
      }
    } catch (error) {
      console.error(
        `Failed to fetch user profile for user ${userId}: ${error.message}`
      );
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "User profile not found. Please ensure the user exists.",
      });
    }

    let videos;
    try {
      videos = await AggregatorService.fetchYouTubeData(query, language);
    } catch (error) {
      console.error(`Failed to fetch video data: ${error.message}`);
      return res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Failed to fetch video data. Please try again later.",
      });
    }

    try {
      await AggregatorService.storeVideoData(videos, language);
    } catch (error) {
      console.error(`Failed to store video data: ${error.message}`);
      // Proceed without throwing error to allow recommendations to be processed
    }

    let recommendations;
    try {
      recommendations = await RecommenderService.getRecommendations(
        userId,
        userProfile,
        query
      );
    } catch (error) {
      console.error(`Failed to fetch recommendations: ${error.message}`);
      return res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Failed to fetch recommendations. Please try again later.",
      });
    }

    const recommendedVideoIds = recommendations.map((rec) => rec.videoId);
    const filteredSearchResults = videos.filter((video) =>
      recommendedVideoIds.includes(video.id.videoId)
    );

    res.status(200).json({ recommendations: filteredSearchResults });
  } catch (error) {
    console.error(`Unhandled error in searchAndRecommend: ${error.message}`);
    next(error);
  }
};

// Get all videos
const getAllVideos = async (req, res, next) => {
  try {
    const videos = await AggregatorService.getAllVideos();
    res.status(200).json(videos);
  } catch (error) {
    console.error(`Failed to fetch all videos: ${error.message}`);
    next(error);
  }
}

// Delete all videos
const deleteAllVideos = async (req, res, next) => {
  try {
    await AggregatorService.deleteAllVideos();
    res.status(200).json({ message: "All videos deleted successfully" });
  } catch (error) {
    console.error(`Failed to delete all videos: ${error.message}`);
    next(error);
  }
}

module.exports = { searchAndRecommend, getAllVideos, deleteAllVideos };
