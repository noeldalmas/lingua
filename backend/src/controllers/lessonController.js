// Updated lessonController.js with improved update logic

const lessonService = require("../services/lessonService");
const courseService = require("../services/courseService");
const {
  isLessonCreator,
  isAuthorizedToUpdateLesson,
} = require("../utils/auth");

// Updated createLesson function with improved validation logic
const createLesson = async (req, res, next) => {
  try {
    // Initialize lessonData with fields that are always set
    const lessonData = {
      createdBy: req.user._id,
      course: req.body.course || undefined,
      verified: req.user.role === "admin",
      verifiedBy: req.user.role === "admin" ? req.user.id : null,
    };

    // Fields that should be trimmed and checked for non-empty values before adding
    const trimAndCheckFields = ["title", "content", "offeredInWhichLanguage"];
    trimAndCheckFields.forEach((field) => {
      if (req.body[field] && req.body[field].trim() !== "") {
        lessonData[field] = req.body[field].trim();
      }
    });

    // Handle array fields, ensuring they are not empty and elements are trimmed
    const arrayFields = ["quizzes", "tags", "files"];
    arrayFields.forEach((field) => {
      if (
        req.body[field] &&
        Array.isArray(req.body[field]) &&
        req.body[field].length > 0
      ) {
        const validatedArray = req.body[field].filter(
          (item) =>
            typeof item === "string" && item.trim() !== "" ||
            typeof item === "object" && item.url && typeof item.url === "string" && item.url.trim() !== ""
        );
        if (validatedArray.length > 0) {
          lessonData[field] = validatedArray;
        }
      }
    });

    const { data: lesson, error } = await lessonService.createLesson(
      lessonData
    );

    if (error) return res.status(404).json({ message: error });

    // If lesson is part of a course, update the course's lessons and contributors
    if (lesson.course) {
      await courseService.updateCourse(lesson.course, {
        $addToSet: { lessons: lesson._id, contributors: req.user.id },
      });
    }

    res.status(201).json(lesson);
  } catch (error) {
    next(error);
  }
};

// Get all lessons
const getAllLessons = async (req, res, next) => {
  try {
    const lessons = await lessonService.getAllLessons();
    res.status(200).json(lessons);
  } catch (error) {
    next(error);
  }
};

// Get lessons by course ID
const getLessonsByCourseId = async (req, res, next) => {
  try {
    const { data: lessons, error } = await lessonService.getLessonsByCourseId(
      req.params.courseId
    );

    if (error) return res.status(404).json({ message: error });

    res.status(200).json(lessons);
  } catch (error) {
    next(error);
  }
};

// Update a lesson with additional validation for empty or whitespace-only strings
const updateLesson = [
  isAuthorizedToUpdateLesson,
  async (req, res, next) => {
    console.log("Entered updateLesson function"); // New log to confirm function entry
    try {
      const { data: lesson, error: lessonNotFound } =
        await lessonService.getLessonById(req.params.id);
      if (lessonNotFound)
        return res.status(404).json({ message: "Lesson not found" });

      console.log("Updating lesson createdBy:", lesson.createdBy);

      // Initialize lessonData with fields that are always updated
      const lessonData = {
        updatedBy: req.user.id,
      };

      // Conditionally add fields from req.body to lessonData
      if (req.body.verified && req.user.role === "admin") {
        lessonData.verified = true;
        lessonData.verifiedBy = req.user.id; // Set verifiedBy only if verified is being set to true
      }

      // Fields that should replace existing values if provided and not empty after trimming
      const replaceFields = ["title", "content", "offeredInWhichLanguage"];
      replaceFields.forEach((field) => {
        if (req.body[field] !== undefined && req.body[field].trim() !== "") {
          lessonData[field] = req.body[field].trim();
        }
      });

      // Prepare the update operation for addToSetFields, including improved handling for 'files'
      const updateOperation = { $set: lessonData };
      const addToSetFields = ["quizzes", "tags"];
      addToSetFields.forEach((field) => {
        if (
          req.body[field] !== undefined &&
          Array.isArray(req.body[field]) &&
          req.body[field].length > 0
        ) {
          const filteredArray = req.body[field].filter(
            (item) => typeof item === "string" && item.trim() !== ""
          );
          if (filteredArray.length > 0) {
            if (!updateOperation.$addToSet) {
              updateOperation.$addToSet = {};
            }
            updateOperation.$addToSet[field] = { $each: filteredArray };
          }
        }
      });

      // Special handling for 'files' to include all attributes
      if (
        req.body.files !== undefined &&
        Array.isArray(req.body.files) &&
        req.body.files.length > 0
      ) {
        const validatedFiles = req.body.files.filter(
          (file) =>
            file.url &&
            typeof file.url === "string" &&
            file.url.trim() !== "" &&
            file.filename &&
            typeof file.filename === "string" &&
            file.filename.trim() !== "" &&
            file.fileType &&
            typeof file.fileType === "string" &&
            file.fileType.trim() !== ""
        );
        if (validatedFiles.length > 0) {
          if (!updateOperation.$addToSet) {
            updateOperation.$addToSet = {};
          }
          updateOperation.$addToSet.files = { $each: validatedFiles };
        }
      }

      const { data: updatedLesson, error: updateError } =
        await lessonService.updateLesson(req.params.id, updateOperation);

      if (updateError) return res.status(400).json({ message: updateError });

      res.status(200).json(updatedLesson);
    } catch (error) {
      next(error);
    }
  },
];

// Delete a lesson
const deleteLesson = [
  async (req, res, next) => {
    // Preliminary check for lesson existence
    const { data: lessonToBeDeleted, error: retrievalError } = await lessonService.getLessonById(req.params.id);
    if (retrievalError || !lessonToBeDeleted) {
      console.error(`Error retrieving lesson: ${retrievalError || "Lesson not found"}`);
      return res.status(404).json({ message: "Lesson not found" });
    }
    // If lesson exists, proceed to the next middleware
    req.lesson = lessonToBeDeleted; // Pass the lesson forward if needed
    next();
  },
  isLessonCreator, // Ensure the user is the creator of the lesson
  isAuthorizedToUpdateLesson, // Check if the user is authorized to update the lesson
  async (req, res, next) => {
    try {
      console.log(`Attempting to delete lesson with ID: ${req.params.id} by user: ${req.user.id}`);

      // Proceed with deletion
      const { data: lesson, error: deleteError } = await lessonService.deleteLesson(req.params.id);
      if (deleteError) {
        console.error(`Error deleting lesson: ${deleteError}`);
        return res.status(400).json({ message: deleteError });
      }

      console.log(`Lesson with ID: ${req.params.id} deleted successfully.`);
      res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error) {
      console.error(`Unexpected error during lesson deletion: ${error}`);
      next(error);
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
