const lessonService = require("../services/lessonService");
const courseService = require("../services/courseService"); // Added to interact with the courseService

// Create a new lesson and update course contributors and lessons
const createLesson = async (req, res, next) => {
  try {
    const lessonData = {
      ...req.body,
      createdBy: req.user.id,
      offeredInWhichLanguage: req.body.offeredInWhichLanguage,
      course: req.body.course ? req.body.course : undefined, // Optional
      verified: req.user.role === "admin",
      verifiedBy: req.user.role === "admin" ? req.user.id : null,
    };
    const lesson = await lessonService.createLesson(lessonData);

    // If lesson is part of a course, update the course's lessons and contributors
    if (lesson.course) {
      await courseService.updateCourse(lesson.course, {
        $addToSet: { lessons: lesson._id, contributors: req.user.id }, // Use $addToSet to avoid duplicates
      });
    }

    res.status(201).json(lesson);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

// Get all lessons
const getAllLessons = async (req, res, next) => {
  try {
    const lessons = await lessonService.getAllLessons();
    res.status(200).json(lessons);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

// Get lessons by course ID
const getLessonsByCourseId = async (req, res, next) => {
  try {
    const lessons = await lessonService.getLessonsByCourseId(
      req.params.courseId
    );
    res.status(200).json(lessons);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

// Update a lesson
const updateLesson = [
  async (req, res, next) => {
    try {
      const lesson = await lessonService.getLessonById(req.params.id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      // Refactored verification logic
      const isTeacherOrAdmin = ["teacher", "admin"].includes(req.user.role);
      const isDifferentUser = lesson.createdBy.toString() !== req.user.id.toString();
      const shouldVerify = isTeacherOrAdmin && isDifferentUser;

      const lessonData = {
        ...req.body,
        updatedBy: req.user.id,
        verified: shouldVerify,
        verifiedBy: shouldVerify ? req.user.id : null,
      };

      const updatedLesson = await lessonService.updateLesson(
        req.params.id,
        lessonData
      );
      res.status(200).json(updatedLesson);
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  },
];

// Delete a lesson
const deleteLesson = [
  async (req, res, next) => {
    try {
      const lesson = await lessonService.deleteLesson(req.params.id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      // If lesson is part of a course, remove it from the course's lessons
      if (lesson.course) {
        await courseService.updateCourse(lesson.course, {
          $pull: { lessons: lesson._id }, // Use $pull to remove the lesson from the course
        });
      }
      res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  },
];

module.exports = {
  createLesson,
  getAllLessons,
  getLessonsByCourseId,
  updateLesson,
  deleteLesson,
};
