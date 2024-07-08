const User = require("../models/User");

const collectFeedback = async (req, res, next) => {
  try {
    const { userId, videoId, rating, watchTime, liked } = req.body;

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the interaction for the given videoId, if it exists
    const interactionIndex = user.interactions.findIndex(
      (interaction) => interaction.videoId === videoId
    );

    if (interactionIndex !== -1) {
      // Update the existing interaction
      user.interactions[interactionIndex] = {
        videoId,
        watchTime,
        rating,
        liked,
      };
    } else {
      // Add a new interaction
      user.interactions.push({ videoId, watchTime, rating, liked });
    }

    // Save the user with the updated interactions
    await user.save();

    res.status(201).json({ message: "Feedback collected successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { collectFeedback };
