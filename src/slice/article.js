import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  articles: [],
  detail: null,
  error: null,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getArticlesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getArticlesSuccess: (state, action) => {
      state.isLoading = false;
      state.articles = action.payload;
    },
    getArticlesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch articles.";
    },


    getArticleDetailStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getArticleDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    getArticleDetailFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch article.";
    },

    postArticleStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    postArticleSuccess: (state, action) => {
      state.isLoading = false;
      state.articles.unshift(action.payload);
      state.detail = action.payload;
    },
    postArticleFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to post article.";
    },

    updateArticleSuccess: (state, action) => {
      state.isLoading = false;
      const updated = action.payload;
      state.articles = state.articles.map((article) =>
        article.id === updated.id ? updated : article
      );
      state.detail = updated;
    },

    deleteArticleSuccess: (state, action) => {
      state.isLoading = false;
      const deletedId = action.payload;
      state.articles = state.articles.filter((article) => article.id !== deletedId);
    },
  },
});

export const {
  getArticlesStart,
  getArticlesSuccess,
  getArticlesFailure,

  getArticleDetailStart,
  getArticleDetailSuccess,
  getArticleDetailFailure,

  postArticleStart,
  postArticleSuccess,
  postArticleFailure,

  updateArticleSuccess,
  deleteArticleSuccess,
} = articleSlice.actions;

export default articleSlice.reducer;
