const express = require("express");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { protect, admin, isCourseCreator } = require("../utils/auth");
const { notFound, errorHandler } = require("../middleware/errorMiddleware");

const router = express.Router();

router.route("/").get(getCourses).post(protect, createCourse);

router
  .route("/:id")
  .get(getCourseById)
  .patch(protect, isCourseCreator, updateCourse)
  .delete(protect, admin, deleteCourse);

// Use the notFound middleware to catch requests to undefined routes
router.use(notFound);

// Use the errorHandler middleware to handle any errors that occur
router.use(errorHandler);

module.exports = router;
