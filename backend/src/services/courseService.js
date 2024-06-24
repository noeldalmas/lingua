const Course = require("../models/Course");
const Lesson = require("../models/Lesson"); // Required for handling lesson deletion

const createCourse = async (courseData) => {
  const course = new Course(courseData);
  return course.save();
};

const getAllCourses = async () => {
  return Course.find().populate("creator", "name email");
};

const getCourseById = async (courseId) => {
  return Course.findById(courseId)
    .populate("creator", "name email")
    .populate("lessons");
};

const updateCourse = async (courseId, courseData) => {
  return Course.findByIdAndUpdate(courseId, courseData, { new: true });
};

const deleteCourse = async (courseId) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }
  // Remove the course's lessons before deleting the course
  await Lesson.deleteMany({ course: courseId });
  await course.remove(); // Use remove to trigger middleware if set up in your schema
  return course;
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
