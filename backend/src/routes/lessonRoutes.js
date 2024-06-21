// src/routes/lessonRoutes.js

const express = require("express");
const {
  createLesson,
  getLessonsByCourseId,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");
const { protect, isLessonCreator } = require("../utils/auth");
const validateLanguage = require("../middleware/validateLanguage");

const router = express.Router();

router.post("/", protect, validateLanguage, createLesson);
router.get("/course/:courseId", getLessonsByCourseId);
router.patch("/:id", protect, validateLanguage, isLessonCreator, updateLesson);
router.delete("/:id", protect, isLessonCreator, deleteLesson);

module.exports = router;
