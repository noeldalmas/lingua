const express = require("express");
const router = express.Router();
const RecommenderController = require("../controllers/recommenderController");
const { protect } = require("../utils/auth");

// Route for getting recommendations based on user profile
router.get(
  "/",
  protect,
  RecommenderController.getRecommendations
);

module.exports = router;
