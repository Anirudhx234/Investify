import type { DrawerMode, DrawerState } from "../types/AppState";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: DrawerState = { mode: "disabled" };

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setDrawer: (state, action: PayloadAction<DrawerMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
