// src/redux/selectors/lessonSelectors.js
export const selectLessons = (state) => state.lessons.lessons;
export const selectLessonsLoading = (state) => state.lessons.loading;
export const selectLessonsError = (state) => state.lessons.error;
