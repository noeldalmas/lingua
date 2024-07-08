const RecommenderService = require("../services/recommenderService");
const userService = require("../services/userService");

const getRecommendations = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const query = req.body.query || "";

    // Fetch user profile using userService
    const user = await userService.findUserByIdForML(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userProfile = user.profile;

    console.log(`Fetching recommendations for user ID: ${userId}`); // Added detailed logging

    const recommendations = await RecommenderService.getRecommendations(
      userId,
      userProfile,
      query
    );
    res.status(200).json({ recommendations });
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
