// src/models/AggregatedContent.js

// Import mongoose for creating the schema
const mongoose = require("mongoose");

// Define the schema for aggregated content
const aggregatedContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  description: {
    type: String,
  },
  sourceUrl: {
    type: String,
    required: true, // Source URL is required
  },
  contentType: {
    type: String,
    enum: ["video", "article", "audio"], // Content type must be one of these values
    required: true,
  },
  tags: [String], // Array of tags for categorization
  categories: [String], // Array of categories
  fetchTimestamp: {
    type: Date,
    default: Date.now, // Automatically set the fetch timestamp
  },
});

// Export the model for use in other parts of the application
module.exports = mongoose.model("AggregatedContent", aggregatedContentSchema);
