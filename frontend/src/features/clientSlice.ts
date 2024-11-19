import type { RootState } from "../app/store";
import type { stateTypes } from "../types";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: stateTypes.Client = { id: null };

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientId: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload;
    },
  },
});

export const { setClientId } = clientSlice.actions;
export default clientSlice.reducer;

export const selectIsLoggedIn = (state: RootState) => state.client.id !== null;
