// src/services/aggregatorService.js

const AggregatedContent = require("../models/AggregatedContent");

// Service to create a new aggregated content
const createAggregatedContent = async (contentData) => {
  try {
    const content = new AggregatedContent(contentData);
    return content.save();
  } catch (error) {
    throw new Error(`Error creating aggregated content: ${error.message}`);
  }
};

// Service to get all aggregated content
const getAggregatedContent = async () => {
  try {
    return AggregatedContent.find();
  } catch (error) {
    throw new Error(`Error fetching aggregated content: ${error.message}`);
  }
};

// Service to update aggregated content
const updateAggregatedContent = async (contentId, contentData) => {
  try {
    return AggregatedContent.findByIdAndUpdate(contentId, contentData, {
      new: true,
    });
  } catch (error) {
    throw new Error(`Error updating aggregated content: ${error.message}`);
  }
};

// Service to delete aggregated content
const deleteAggregatedContent = async (contentId) => {
  try {
    const content = await AggregatedContent.findByIdAndDelete(contentId);
    if (!content) {
      throw new Error("Aggregated content not found");
    }
    return content;
  } catch (error) {
    throw new Error(`Error deleting aggregated content: ${error.message}`);
  }
};

module.exports = {
  createAggregatedContent,
  getAggregatedContent,
  updateAggregatedContent,
  deleteAggregatedContent,
};
