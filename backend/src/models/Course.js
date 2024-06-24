// src/models/Course.js
const mongoose = require("mongoose");
const LanguagesEnum = require("../utils/enums/LanguagesEnum");
const fileSchema = require("./FileSchema");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offeredInLanguages: {
      type: [
        {
          type: String,
          enum: Object.values(LanguagesEnum),
        },
      ],
      required: true,
    },
    teachesLanguage: {
      type: String,
      enum: Object.values(LanguagesEnum),
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    contributors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    files: [fileSchema],
  },
  {
    timestamps: true, // This will automatically create and update `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model("Course", courseSchema);
