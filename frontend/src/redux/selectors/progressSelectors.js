// src/redux/selectors/progressSelectors.js
export const selectProgress = (state) => state.progress.progress;
export const selectProgressLoading = (state) => state.progress.loading;
export const selectProgressError = (state) => state.progress.error;
