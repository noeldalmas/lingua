const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/feedbackController");

// Route for collecting feedback
router.post("/:id", FeedbackController.collectFeedback);

module.exports = router;
