// src/middleware/validateLanguage.js

const Course = require("../models/Course");

const validateLanguage = async (req, res, next) => {
  if (req.body.course) {
    const course = await Course.findById(req.body.course);
    if (course.language !== req.body.language) {
      return res.status(400).json({
        error: "The language of the lesson and course must match",
      });
    }
  }
  next();
};

module.exports = validateLanguage;
