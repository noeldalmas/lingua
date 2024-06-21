// src/models/Forum.js

// Import mongoose for creating the schema
const mongoose = require("mongoose");

// Define the schema for a forum post
const forumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  content: {
    type: String,
    required: true, // Content is required
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Forum", // Reference to the Forum model for nested replies
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Export the model for use in other parts of the application
module.exports = mongoose.model("Forum", forumSchema);
