import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    loggedIn: false,
    error: null,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUserStart: state => {
            state.isLoading = true
            state.error = null
        },
        signUserSuccess: (state, action) => {
            state.isLoading = false
            state.loggedIn = true
            state.user = action.payload
            state.error = null
            localStorage.setItem("token", action.payload.token)
        },
        signUserFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        resetMessage: (state) => {
            state.error = null
        },
        logoutUser: (state) => {
            state.user = null
            state.loggedIn = false
        }
    }
})

export const { signUserStart, signUserSuccess, signUserFailure, resetMessage, logoutUser } = authSlice.actions
export default authSlice.reducer