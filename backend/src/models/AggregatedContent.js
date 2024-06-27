const mongoose = require("mongoose");

const thumbnailSchema = new mongoose.Schema({
  url: String,
  width: Number,
  height: Number,
});

const aggregatedContentSchema = new mongoose.Schema(
  {
    kind: { type: String, required: true },
    etag: { type: String, required: true },
    videoId: { type: String, required: true, unique: true },
    channelId: { type: String, required: true },
    playlistId: { type: String },
    publishedAt: { type: Date, required: true },
    channelTitle: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnails: {
      default: thumbnailSchema,
      medium: thumbnailSchema,
      high: thumbnailSchema,
      standard: thumbnailSchema,
      maxres: thumbnailSchema,
    },
    liveBroadcastContent: { type: String, required: true },
    tags: { type: [String], required: false },
    language: { type: String, required: true },
  },
  { timestamps: true }
);

const AggregatedContent = mongoose.model(
  "AggregatedContent",
  aggregatedContentSchema
);

module.exports = AggregatedContent;
