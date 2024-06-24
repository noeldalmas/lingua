const mongoose = require("mongoose");
require("../models/Language"); // Ensure the Language model is registered

const validateLanguage = async (req, res, next) => {
  if (req.body.course && req.body.language) {
    const Course = mongoose.model("Course");
    const Language = mongoose.model("Language");

    try {
      // Find the language document by name
      const language = await Language.findOne({ name: req.body.language });
      if (!language) {
        return res.status(400).json({ error: "Language not found" });
      }

      // Find the course document by ID
      const course = await Course.findById(req.body.course);
      if (!course) {
        return res.status(400).json({ error: "Course not found" });
      }

      // Compare the language ObjectId in the course with the language document's ObjectId
      if (!course.language.equals(language._id)) {
        return res.status(400).json({
          error: "The language of the lesson and course must match",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  next();
};

module.exports = validateLanguage;
