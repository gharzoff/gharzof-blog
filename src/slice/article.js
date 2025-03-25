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
        getArticleStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getArticleSuccess: (state, action) => {
            state.isLoading = false;
            state.articles = action.payload;
        },
        getArticleFailure: (state) => {
            state.isLoading = false;
            state.error = 'error';
        },
        articleDetailStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        articleDetailSuccess: (state, action) => {
            state.isLoading = false;
            state.detail = action.payload;
        },
        articleDetailFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        postArticleStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        postArticleSuccess: (state) => {
            state.isLoading = false;
            state.detail = null;
        },
        postArticleFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getArticleStart,
    getArticleSuccess,
    getArticleFailure,
    articleDetailStart,
    articleDetailSuccess,
    articleDetailFailure,
    postArticleStart,
    postArticleSuccess,
    postArticleFailure,
} = articleSlice.actions;

export default articleSlice.reducer;
