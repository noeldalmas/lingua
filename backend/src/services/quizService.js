// src/services/quizService.js

const Quiz = require("../models/Quiz");
const Lesson = require("../models/Lesson");

// Service to create a new quiz
const createQuiz = async (quizData) => {
  try {
    const quiz = new Quiz(quizData);
    await quiz.save();

    const lesson = await Lesson.findById(quizData.lesson);
    lesson.quizzes.push(quiz._id);
    await lesson.save();

    return quiz;
  } catch (error) {
    throw new Error(`Error creating quiz: ${error.message}`);
  }
};

// Service to get quizzes by lesson ID
const getQuizzesByLessonId = async (lessonId) => {
  try {
    return Quiz.find({ lesson: lessonId });
  } catch (error) {
    throw new Error(`Error fetching quizzes: ${error.message}`);
  }
};

// Service to update a quiz
const updateQuiz = async (quizId, quizData) => {
  try {
    return Quiz.findByIdAndUpdate(quizId, quizData, { new: true });
  } catch (error) {
    throw new Error(`Error updating quiz: ${error.message}`);
  }
};

// Service to delete a quiz
const deleteQuiz = async (quizId) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (quiz) {
      const lesson = await Lesson.findById(quiz.lesson);
      lesson.quizzes.pull(quiz._id);
      await lesson.save();
    }
    return quiz;
  } catch (error) {
    throw new Error(`Error deleting quiz: ${error.message}`);
  }
};

module.exports = {
  createQuiz,
  getQuizzesByLessonId,
  updateQuiz,
  deleteQuiz,
};
