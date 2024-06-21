// src/controllers/forumController.js

const forumService = require("../services/forumService");

// Create a new forum post
const createPost = async (req, res) => {
  try {
    const post = await forumService.createPost({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all forum posts
const getPosts = async (req, res) => {
  try {
    const posts = await forumService.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  try {
    const post = await forumService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a reply to a post
const addReply = async (req, res) => {
  try {
    const reply = await forumService.addReply(req.params.id, {
      content: req.body.content,
      user: req.user.id,
    });
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPosts, getPostById, addReply };
