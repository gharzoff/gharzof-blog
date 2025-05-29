import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signUserSuccess: (state, action) => {
      state.isLoading = false;
      state.loggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    signUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetMessage: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loggedIn = false;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
    setToken: (state, action) => {
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
    },
  },
});

export const {
  signUserStart,
  signUserSuccess,
  signUserFailure,
  resetMessage,
  logoutUser,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;
