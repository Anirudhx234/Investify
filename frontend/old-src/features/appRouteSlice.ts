import type { AppRouteState } from "../types/AppState";
import type { AppRouteArgs } from "../types/AppRouter";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppRouteState = { args: null };

const appRouteSlice = createSlice({
  name: "appRoute",
  initialState,
  reducers: {
    setAppRouteArgs: (state, action: PayloadAction<AppRouteArgs | null>) => {
      state.args = action.payload;
    },
  },
});

export const { setAppRouteArgs } = appRouteSlice.actions;
export default appRouteSlice.reducer;
