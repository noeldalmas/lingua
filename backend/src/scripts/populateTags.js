// src/scripts/populateTags.js

const mongoose = require("mongoose");
const Tag = require("../models/Tag");
const connectDB = require("../utils/database");

// List of tags
const tags = [
  "Science",
  "Technology",
  "Engineering",
  "Art",
  "History",
  "Literature",
  "Music",
  "Business",
  "Economics",
  "Philosophy",
  "Psychology",
  "Sociology",
  "Politics",
  "Law",
  "Medicine",
  "Health",
  "Fitness",
  "Cooking",
  "Travel",
  "Languages",
  "Design",
  "Marketing",
  "Finance",
  "Entrepreneurship",
  "Education",
  "Environment",
  "Sustainability",
  "Culture",
  "Sports",
  "Entertainment",
  "Fashion",
  "Photography",
  "Film",
  "Grammar",
  "Vocabulary",
  "Listening",
  "Reading",
  "Speaking Practice",
  "Culture",
  "Exercises",
  "Business",
  "Travel",
  "News",
  "Entertainment",
  "Academic",
  "Technical",
  "Informal",
  "Comedy",
];

// Connect to the database
connectDB();

// Function to upsert tags
async function upsertTags() {
  try {
    const promises = tags.map(tag => {
      return Tag.findOneAndUpdate(
        { name: tag }, // filter
        { name: tag }, // document to insert when nothing was found
        { upsert: true, new: true, runValidators: true } // options
      );
    });

    // Wait for all the findOneAndUpdate operations to complete
    const results = await Promise.all(promises);
    console.log(`Upserted ${results.length} tags.`);

    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from database.');
  } catch (err) {
    console.error(err);
    // Ensure disconnection in case of error as well
    await mongoose.disconnect();
    console.log('Disconnected from database due to error.');
  }
}

// Execute the upsertTags function
upsertTags();
