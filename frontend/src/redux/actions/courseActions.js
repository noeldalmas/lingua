// src/redux/actions/courseActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "../../services/api/courseService";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const response = await courseService.getCourses();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseData, thunkAPI) => {
    try {
      const response = await courseService.createCourse(courseData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (courseData, thunkAPI) => {
    try {
      const response = await courseService.updateCourse(courseData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId, thunkAPI) => {
    try {
      await courseService.deleteCourse(courseId);
      return courseId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
