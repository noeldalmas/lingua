// src/routes/forumRoutes.js

const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  addReply,
} = require("../controllers/forumController");
const { protect } = require("../utils/auth");

const router = express.Router();

// Protected routes
router.post("/", protect, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/:id/replies", protect, addReply);

module.exports = router;
