const Course = require("../models/Course");

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
  const course = await Course.findByIdAndDelete(courseId);
  if (!course) {
    throw new Error("Course not found");
  }
  return course;
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
