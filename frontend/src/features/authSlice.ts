import { authApi } from "../api/auth";
import AuthState from "../types/AuthState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.verify.matchFulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.signout.matchFulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
