const courseService = require("../services/courseService");

const createCourse = async (req, res, next) => {
  const { title, description, offeredInLanguages, teachesLanguage, files } = req.body;

  try {
    const courseData = {
      title,
      description,
      offeredInLanguages,
      teachesLanguage,
      files,
      creator: req.user.id,
    };
    const course = await courseService.createCourse(courseData);

    res.status(201).json(course);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();

    res.status(200).json(courses);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await courseService.getCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const updateCourse = async (req, res, next) => {
  const { title, description, offeredInLanguages, teachesLanguage } = req.body;

  try {
    const updateData = {
      title,
      description,
      offeredInLanguages,
      teachesLanguage,
    };
    const course = await courseService.updateCourse(
      req.params.id,
      updateData,
      req.user.id
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await courseService.deleteCourse(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
