const RecommenderService = require("../services/recommenderService");
const userService = require("../services/userService");
const AggregatorService = require("../services/aggregatorService");

const getRecommendations = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const query = ""; // Set query to empty string for recommender
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 10;

    // Fetch user profile using userService
    const user = await userService.findUserByIdForML(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userProfile = user.userProfile;

    console.log(`Fetching recommendations for user ID: ${userId}`);

    // Get recommendations from RecommenderService
    const recommendations = await RecommenderService.getRecommendations(
      userId,
      userProfile,
      query
    );

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
        videoId: video.videoId,
        title: video.title,
        channelName: video.channelName,
        duration: video.duration,
        score: recommendedScores[scoreIndex],
      };
    });

    // Sort by score in descending order
    videoDataWithScores.sort((a, b) => b.score - a.score);

    // Paginate the results
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = videoDataWithScores.slice(startIndex, endIndex);

    res.status(200).json({ recommendations: paginatedResults });
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error.response && error.response.status === 404) {
      errorMessage = "User not found";
    } else if (error.message.includes("Failed to fetch recommendations")) {
      errorMessage = "Recommendation service is currently unavailable";
    }
    res.status(500).json({ message: errorMessage });
    next(error);
  }
};

module.exports = { getRecommendations };
