// src/services/forumService.js

const Forum = require("../models/Forum");

// Service to create a new forum post
const createPost = async (postData) => {
  try {
    const post = new Forum(postData);
    return post.save();
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }
};

// Service to get all forum posts
const getPosts = async () => {
  try {
    return Forum.find().populate("user", "name email");
  } catch (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
};

// Service to get a forum post by ID
const getPostById = async (postId) => {
  try {
    return Forum.findById(postId)
      .populate("user", "name email")
      .populate("replies");
  } catch (error) {
    throw new Error(`Error fetching post: ${error.message}`);
  }
};

// Service to add a reply to a forum post
const addReply = async (postId, replyData) => {
  try {
    const post = await Forum.findById(postId);
    if (post) {
      const reply = new Forum(replyData);
      await reply.save();

      post.replies.push(reply._id);
      await post.save();

      return reply;
    }
    throw new Error("Post not found");
  } catch (error) {
    throw new Error(`Error adding reply: ${error.message}`);
  }
};

module.exports = { createPost, getPosts, getPostById, addReply };
