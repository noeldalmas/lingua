const express = require("express");
const {
  createLesson,
  getAllLessons,
  getLessonsByCourseId,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");
const { protect, isLessonCreator, teacherOrAdmin, isAuthorizedToUpdateLesson } = require("../utils/auth");
const validateLanguage = require("../middleware/validateLanguage");

const router = express.Router();

router.get("/", protect, getAllLessons);
router.post("/", protect, validateLanguage, createLesson);
router.get("/course/:courseId", protect, getLessonsByCourseId);
router.patch(
  "/:id",
  protect,
  isAuthorizedToUpdateLesson,
  validateLanguage,
  updateLesson
);
router.delete("/:id", protect, isAuthorizedToUpdateLesson, deleteLesson);

module.exports = router;
