const mongoose = require("mongoose");

const validateLanguage = async (req, res, next) => {
  if (req.body.course) {
    const Course = mongoose.model("Course");
    const course = await Course.findById(req.body.course);
    if (!course) {
      return res.status(400).json({
        error: "Course not found",
      });
    }
    if (course.language.toString() !== req.body.language) {
      return res.status(400).json({
        error: "The language of the lesson and course must match",
      });
    }
  }
  next();
};

module.exports = validateLanguage;
