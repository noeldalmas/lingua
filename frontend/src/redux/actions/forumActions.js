// src/redux/actions/forumActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import forumService from "../../services/api/forumService";

export const fetchPosts = createAsyncThunk(
  "forum/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await forumService.getPosts();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  "forum/createPost",
  async (postData, thunkAPI) => {
    try {
      const response = await forumService.createPost(postData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  "forum/updatePost",
  async (postData, thunkAPI) => {
    try {
      const response = await forumService.updatePost(postData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "forum/deletePost",
  async (postId, thunkAPI) => {
    try {
      await forumService.deletePost(postId);
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
