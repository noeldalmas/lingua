const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AggregatedContentSchema = new Schema({
  videoId: { type: String, required: true, unique: true },
  title: String,
  description: String,
  publishedAt: Date,
  channelId: String,
  channelName: String,
  categoryId: String,
  category: String,
  tags: [String],
  duration: String,
  viewCount: Number,
  likeCount: Number,
  language: String,
});

module.exports = mongoose.model("AggregatedContent", AggregatedContentSchema);
