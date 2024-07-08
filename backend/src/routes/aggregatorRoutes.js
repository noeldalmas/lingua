const express = require("express");
const router = express.Router();
const AggregatorController = require("../controllers/aggregatorController");
const { protect } = require("../utils/auth");

// Route for searching and recommending videos
router.post(
  "/searchAndRecommend",
  protect,
  AggregatorController.searchAndRecommend
);

// Get all videos
router.get("/videos", AggregatorController.getAllVideos);

// Delete all videos
router.delete("/videos", AggregatorController.deleteAllVideos);

module.exports = router;
