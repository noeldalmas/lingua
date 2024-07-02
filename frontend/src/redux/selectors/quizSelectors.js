// src/redux/selectors/quizSelectors.js
export const selectQuizzes = (state) => state.quizzes.quizzes;
export const selectQuizzesLoading = (state) => state.quizzes.loading;
export const selectQuizzesError = (state) => state.quizzes.error;
