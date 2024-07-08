// src/routes/userRoutes.js

const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUser,
  deleteUser,
  getAllUsers,
  getAllUsersDataForML,
} = require("../controllers/userController");
const { protect, admin } = require("../utils/auth");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile);

// Admin user management routes
// GET /api/users
router.route("/").get(protect, admin, getAllUsers);

// PATCH /api/users/:id
router.route("/:id").patch(protect, admin, updateUser);

// DELETE /api/users/:id
router
  .route("/:id")
  .patch(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// Get all users for python app
router.route("/allUserData").get(getAllUsersDataForML);

module.exports = router;
