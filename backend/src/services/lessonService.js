const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

// Service to create a new lesson
const createLesson = async (lessonData) => {
  try {
    const course = await Course.findById(lessonData.course);
    if (!course) {
      throw new Error("Course not found");
    }

    const lesson = new Lesson(lessonData);
    await lesson.save();

    course.lessons.push(lesson._id);
    await course.save();

    return lesson;
  } catch (error) {
    throw new Error(`Error creating lesson: ${error.message}`);
  }
};

// Service to get lessons by course ID
const getLessonsByCourseId = async (courseId) => {
  try {
    return Lesson.find({ course: courseId });
  } catch (error) {
    throw new Error(`Error fetching lessons: ${error.message}`);
  }
};

// Service to update a lesson
const updateLesson = async (lessonId, lessonData) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(lessonId, lessonData, {
      new: true,
    });
    if (!lesson) {
      throw new Error("Lesson not found");
    }
    return lesson;
  } catch (error) {
    throw new Error(`Error updating lesson: ${error.message}`);
  }
};

// Service to delete a lesson
const deleteLesson = async (lessonId) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(lessonId);
    if (!lesson) {
      throw new Error("Lesson not found");
    }
    const course = await Course.findById(lesson.course);
    if (course) {
      course.lessons.pull(lesson._id);
      await course.save();
    }
    return lesson;
  } catch (error) {
    throw new Error(`Error deleting lesson: ${error.message}`);
  }
};

module.exports = {
  createLesson,
  getLessonsByCourseId,
  updateLesson,
  deleteLesson,
};
