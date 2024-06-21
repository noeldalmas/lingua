// src/controllers/aggregatorController.js

const aggregatorService = require("../services/aggregatorService");

// Create a new aggregated content
const createAggregatedContent = async (req, res) => {
  try {
    const content = await aggregatorService.createAggregatedContent(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all aggregated content
const getAggregatedContent = async (req, res) => {
  try {
    const content = await aggregatorService.getAggregatedContent();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAggregatedContent, getAggregatedContent };
