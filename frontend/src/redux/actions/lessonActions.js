// src/redux/actions/lessonActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import lessonService from "../../services/api/lessonService";

export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons",
  async (courseId, thunkAPI) => {
    try {
      const response = await lessonService.getLessons(courseId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createLesson = createAsyncThunk(
  "lessons/createLesson",
  async (lessonData, thunkAPI) => {
    try {
      const response = await lessonService.createLesson(lessonData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateLesson = createAsyncThunk(
  "lessons/updateLesson",
  async (lessonData, thunkAPI) => {
    try {
      const response = await lessonService.updateLesson(lessonData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  "lessons/deleteLesson",
  async (lessonId, thunkAPI) => {
    try {
      await lessonService.deleteLesson(lessonId);
      return lessonId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
