import type { stateTypes } from "../types";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: stateTypes.AssetsSearch = { value: "" };

const assetsSearchSlice = createSlice({
  name: "assetsSearch",
  initialState,
  reducers: {
    setAssetsSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setAssetsSearchValue } = assetsSearchSlice.actions;
export default assetsSearchSlice.reducer;
