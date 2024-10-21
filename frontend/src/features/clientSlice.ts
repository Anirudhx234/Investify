import type AppClient from "../types/AppClient";
import type { ClientState } from "../types/AppState";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: ClientState = { loggedInClient: null };

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<AppClient>) => {
      state.loggedInClient = action.payload;
    },
  },
});

export const { setClient } = clientSlice.actions;
export default clientSlice.reducer;
