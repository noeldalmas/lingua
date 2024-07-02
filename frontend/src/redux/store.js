// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import courseReducer from "./reducers/courseReducer";
import lessonReducer from "./reducers/lessonReducer";
import quizReducer from "./reducers/quizReducer";
import forumReducer from "./reducers/forumReducer";
import progressReducer from "./reducers/progressReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    courses: courseReducer,
    lessons: lessonReducer,
    quizzes: quizReducer,
    forum: forumReducer,
    progress: progressReducer,
  },
});

export default store;
