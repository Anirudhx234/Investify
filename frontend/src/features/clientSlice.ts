import type { ClientState } from "../types/AppState";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: ClientState = { id: null };

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setClientId } = clientSlice.actions;
export default clientSlice.reducer;
