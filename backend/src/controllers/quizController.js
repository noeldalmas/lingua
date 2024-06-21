// src/controllers/quizController.js

const quizService = require("../services/quizService");

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    const quiz = await quizService.createQuiz(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get quizzes by lesson ID
const getQuizzesByLessonId = async (req, res) => {
  try {
    const quizzes = await quizService.getQuizzesByLessonId(req.params.lessonId);
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createQuiz, getQuizzesByLessonId };
