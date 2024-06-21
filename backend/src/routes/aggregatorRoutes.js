// src/routes/aggregatorRoutes.js

const express = require("express");
const {
  createAggregatedContent,
  getAggregatedContent,
} = require("../controllers/aggregatorController");
const { protect } = require("../utils/auth");

const router = express.Router();

// Protected routes
router.post("/", protect, createAggregatedContent);
router.get("/", getAggregatedContent);

module.exports = router;
