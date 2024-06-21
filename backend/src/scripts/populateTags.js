// src/scripts/populateTags.js

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
  "Comedy"
];

// Connect to the database
connectDB();

// Loop through the list of tags
tags.forEach((tag) => {
  // Find the Tag and update it if it exists, otherwise create a new Tag
  Tag.findOneAndUpdate(
    { name: tag }, // filter
    { name: tag }, // document to insert when nothing was found
    { upsert: true, new: true, runValidators: true }, // options
    (err, doc) => {
      // callback
      if (err) {
        console.log(err);
      } else {
        console.log(`Upserted tag: ${doc.name}`);
      }
    }
  );
});
