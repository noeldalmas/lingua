const Feedback = require("../models/Feedback");

const collectFeedback = async (userId, videoId, rating) => {
  const feedback = new Feedback({ userId, videoId, rating });
  await feedback.save();
};

module.exports = { collectFeedback };
