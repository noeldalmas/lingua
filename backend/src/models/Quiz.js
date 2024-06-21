// src/models/Quiz.js

// Import mongoose for creating the schema
const mongoose = require("mongoose");

// Define the schema for a quiz
const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true, // Question is required
  },
  options: [
    {
      text: String,
      isCorrect: Boolean,
    },
  ],
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson", // Reference to the Lesson model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Export the model for use in other parts of the application
module.exports = mongoose.model("Quiz", quizSchema);
