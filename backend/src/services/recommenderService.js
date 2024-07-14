const axios = require("axios");
require("dotenv").config();

const PYTHON_SERVICE_URL =
  process.env.PYTHON_SERVICE_URL || "http://localhost:5000";

const getRecommendations = async (userId, userProfile, query) => {
  try {
    console.log(
      `Sending request for userId: ${userId}, userProfile: ${JSON.stringify(
        userProfile
      )}, query: ${query}`
    );

    const response = await axios.get(
      `${PYTHON_SERVICE_URL}/recommendations/${userId}`,
      {
        params: { profile: JSON.stringify(userProfile), query: query },
      }
    );
    return response.data.recommendations;
  } catch (error) {
    console.error(
      `Error fetching recommendations for user ${userId}: ${error.message}`
    );
    throw new Error("Failed to fetch recommendations. Please try again later.");
  }
};

module.exports = { getRecommendations };
