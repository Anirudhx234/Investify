import type ThemeState from "./ThemeState";

import { createSlice } from "@reduxjs/toolkit";

const initialState: ThemeState = { mode: "corporate" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "corporate" ? "dark" : "corporate";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
