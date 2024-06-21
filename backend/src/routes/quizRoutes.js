// src/routes/quizRoutes.js

const express = require("express");
const {
  createQuiz,
  getQuizzesByLessonId,
} = require("../controllers/quizController");
const { protect } = require("../utils/auth");

const router = express.Router();

// Protected routes
router.post("/", protect, createQuiz);
router.get("/lesson/:lessonId", getQuizzesByLessonId);

module.exports = router;
