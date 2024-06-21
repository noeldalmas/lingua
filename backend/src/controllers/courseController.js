const courseService = require("../services/courseService");

const createCourse = async (req, res) => {
  const { title, description, language } = req.body;

  try {
    const course = await courseService.createCourse({
      title,
      description,
      language,
      creator: req.user.id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateCourse = async (req, res) => {
  const { title, description, language } = req.body;

  try {
    const course = await courseService.updateCourse(
      req.params.id,
      { title, description, language },
      req.user.id
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await courseService.deleteCourse(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
