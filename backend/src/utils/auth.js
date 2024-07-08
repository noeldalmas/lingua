// src/utils/auth.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const courseService = require("../services/courseService");
const lessonService = require("../services/lessonService");

dotenv.config();

// Middleware to protect routes
const protect = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // Remove "Bearer " from token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded JWT:", decoded); // Debugging log to verify token payload

      // Check for the presence of _id and role in the decoded token
      if (!decoded.hasOwnProperty("_id") || !decoded.hasOwnProperty("role")) {
        console.log("Token is missing required claims: _id or role"); // Additional logging for troubleshooting
        return res
          .status(401)
          .json({ message: "Unauthorized, token is missing required claims" });
      }

      req.user = { _id: decoded._id, role: decoded.role };
      next();
    } catch (err) {
      console.error("Token verification error:", err.message); // Log the error for debugging
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
  console.log("generateToken called with user:", user);
  if (!user.role) {
    console.error("Error: User object is missing the role property.");
    return null;
  }
  try {
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    console.log("Token generated for user:", user); // Log after successful token generation
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
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
  if (
    course.creator._id.toString() === req.user._id ||
    req.user.role === "admin"
  ) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized, not course creator" });
  }
};

// Check if the authenticated user is the creator of the lesson
const isLessonCreator = async (req, res, next) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    console.log(
      "Lesson createdBy:",
      lesson.data.createdBy,
      "User ID:",
      req.user?._id
    ); // Debugging log
    if (!lesson.data.createdBy) {
      return res
        .status(400)
        .json({ message: "Lesson creator information is missing" });
    }
    if (
      req.user &&
      req.user._id &&
      (lesson.data.createdBy.toString() === req.user._id.toString() ||
        req.user.role === "admin")
    ) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized, not lesson creator" });
    }
  } catch (error) {
    next(error);
  }
};

// Require teacher or admin access
const teacherOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "teacher" || req.user.role === "admin")) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized, teacher or admin access only" });
  }
};

// Check if the user is authorized to update the lesson
const isAuthorizedToUpdateLesson = async (req, res, next) => {
  try {
    console.log("Entering isAuthorizedToUpdateLesson");
    const lesson = await lessonService.getLessonById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Check if lesson.data is undefined
    if (!lesson.data) {
      return res.status(500).json({ message: "Lesson data is missing" });
    }

    console.log("Lesson createdBy:", lesson.data.createdBy);

    // Check if the user is the creator or has a 'teacher' or 'admin' role
    if (
      lesson.data.createdBy &&
      req.user &&
      (lesson.data.createdBy.toString() === req.user._id.toString() ||
        req.user.role === "teacher" ||
        req.user.role === "admin")
    ) {
      console.log("User is authorized to update the lesson");
      next();
    } else {
      console.log("User is not authorized to update the lesson");
      res.status(401).json({
        message: "Unauthorized, not authorized to update this lesson",
      });
    }
  } catch (error) {
    console.log("Error in isAuthorizedToUpdateLesson:", error);
    next(error);
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
  isAuthorizedToUpdateLesson,
};
