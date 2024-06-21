// src/utils/auth.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const courseService = require("../services/courseService");

dotenv.config();

// Middleware to protect routes
const protect = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }
  if (token.startsWith("Bearer")) {
    token = token.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized, invalid token" });
    }
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized, token format is not correct" });
  }
};

// Hash the password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare passwords
const comparePassword = async (enteredPassword, hashedPassword) => {
  return bcrypt.compare(enteredPassword, hashedPassword);
};

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Require admin access
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized, admin access only" });
  }
};

// Check if the authenticated user is the creator of the course
const isCourseCreator = async (req, res, next) => {
  const course = await courseService.getCourseById(req.params.id);
  if (course.creator._id.toString() === req.user.id || req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized, not course creator" });
  }
};

// Check if the authenticated user is the creator of the lesson
const isLessonCreator = async (req, res, next) => {
  const lesson = await lessonService.getLessonById(req.params.id);
  if (lesson.createdBy.toString() === req.user.id || req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized, not lesson creator" });
  }
};

// Require teacher or admin access
const teacherOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'teacher' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized, teacher or admin access only" });
  }
};

module.exports = {
  protect,
  admin,
  hashPassword,
  comparePassword,
  generateToken,
  isCourseCreator,
  teacherOrAdmin,
  isLessonCreator,
};
