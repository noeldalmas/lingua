// src/models/Tag.js

const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Tag names should be unique
  },
});

module.exports = mongoose.model("Tag", tagSchema);
