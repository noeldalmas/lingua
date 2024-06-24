// src/scripts/populateLanguages.js
const Language = require("../models/Language");
const connectDB = require("../utils/database");

// List of languages
const languages = ["swahili", "luhya", "luo", "gikuyu", "kalenjin"];

// Connect to the database
connectDB();

// Function to upsert languages
const upsertLanguages = async () => {
  for (const language of languages) {
    try {
      const doc = await Language.findOneAndUpdate(
        { name: language }, // filter
        { name: language }, // document to insert when nothing was found
        { upsert: true, new: true, runValidators: true } // options
      );
      console.log(`Upserted language: ${doc.name}`);
    } catch (err) {
      console.log(err);
    }
  }
  // Disconnect from the database and exit the process
  await mongoose.disconnect();
  process.exit();
};

upsertLanguages();