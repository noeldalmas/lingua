const lessonService = require("../services/lessonService");

// Create a new lesson
const createLesson = async (req, res) => {
  try {
    const lessonData = {
      ...req.body,
      createdBy: req.user.id,
      verified: req.user.role === "admin",
      verifiedBy: req.user.role === "admin" ? req.user.id : null,
    };
    const lesson = await lessonService.createLesson(lessonData);
    res.status(201).json(lesson);
  } catch (error) {
    console.error("Error creating lesson:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get lessons by course ID
const getLessonsByCourseId = async (req, res) => {
  try {
    const lessons = await lessonService.getLessonsByCourseId(
      req.params.courseId
    );
    res.status(200).json(lessons);
  } catch (error) {
    console.error("Error fetching lessons by course ID:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update a lesson
const updateLesson = async (req, res) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    const lessonData = {
      ...req.body,
      updatedBy: req.user.id,
      verified: (req.user.role === 'teacher' || req.user.role === 'admin') && lesson.createdBy.toString() !== req.user.id.toString(),
      verifiedBy: (req.user.role === 'teacher' || req.user.role === 'admin') && lesson.createdBy.toString() !== req.user.id.toString() ? req.user.id : null,
    };
    const updatedLesson = await lessonService.updateLesson(req.params.id, lessonData);
    res.status(200).json(updatedLesson);
  } catch (error) {
    console.error("Error updating lesson:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete a lesson
const deleteLesson = async (req, res) => {
  try {
    const lesson = await lessonService.deleteLesson(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json(lesson);
  } catch (error) {
    console.error("Error deleting lesson:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLesson,
  getLessonsByCourseId,
  updateLesson,
  deleteLesson,
};
