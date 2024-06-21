const express = require("express");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { protect, admin, isCourseCreator } = require("../utils/auth");

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, createCourse);

router.route('/:id')
  .get(getCourseById)
  .patch(protect, isCourseCreator, updateCourse)
  .delete(protect, admin, deleteCourse);

module.exports = router;
