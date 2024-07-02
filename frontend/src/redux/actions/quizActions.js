// src/redux/actions/quizActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "../../services/api/quizService";

export const fetchQuizzes = createAsyncThunk(
  "quizzes/fetchQuizzes",
  async (courseId, thunkAPI) => {
    try {
      const response = await quizService.getQuizzes(courseId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createQuiz = createAsyncThunk(
  "quizzes/createQuiz",
  async (quizData, thunkAPI) => {
    try {
      const response = await quizService.createQuiz(quizData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateQuiz = createAsyncThunk(
  "quizzes/updateQuiz",
  async (quizData, thunkAPI) => {
    try {
      const response = await quizService.updateQuiz(quizData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quizzes/deleteQuiz",
  async (quizId, thunkAPI) => {
    try {
      await quizService.deleteQuiz(quizId);
      return quizId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
