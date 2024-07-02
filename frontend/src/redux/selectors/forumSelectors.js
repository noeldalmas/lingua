// src/redux/selectors/forumSelectors.js
export const selectForumPosts = (state) => state.forum.posts;
export const selectForumLoading = (state) => state.forum.loading;
export const selectForumError = (state) => state.forum.error;
