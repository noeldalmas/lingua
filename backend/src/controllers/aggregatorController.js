// aggregatorController.js

const AggregatorService = require("../services/aggregatorService");
const UserService = require("../services/userService");
const RecommenderService = require("../services/recommenderService"); // Ensure RecommenderService is required if used

const searchAndRecommend = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const query = req.body.query;
    const language = req.body.language;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 10;

    let userProfile;
    try {
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

    const recommendedVideoIds = recommendations.map((rec) => rec[0]);
    const recommendedScores = recommendations.map((rec) => rec[1]);

    // Log recommended video IDs and their scores
    console.log("Recommended Video IDs and Scores:", recommendations);

    // Fetch video information from the database using the recommended video IDs
    let videoData;
    try {
      videoData = await AggregatorService.getVideoDetailsByIds(
        recommendedVideoIds
      );
    } catch (error) {
      console.error(`Failed to fetch video details: ${error.message}`);
      return res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Failed to fetch video details. Please try again later.",
      });
    }

    // Attach scores to the video data
    const videoDataWithScores = videoData.map((video) => {
      const scoreIndex = recommendedVideoIds.indexOf(video.videoId);
      return {
        ...video._doc,
        score: recommendedScores[scoreIndex],
      };
    });

    // Sort by score in descending order
    videoDataWithScores.sort((a, b) => b.score - a.score);

    // Paginate the results
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = videoDataWithScores.slice(startIndex, endIndex);

    // Format the results to include only necessary fields
    const formattedResults = paginatedResults.map((video) => ({
      videoId: video.videoId,
      title: video.title,
      channelName: video.channelName,
      duration: video.duration,
      score: video.score,
    }));

    res.status(200).json({ recommendations: formattedResults });
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
