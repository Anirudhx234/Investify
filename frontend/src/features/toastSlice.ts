import type { stateTypes } from "../types";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: stateTypes.Toast = { alerts: [] };

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<stateTypes.Alert>) => {
      state.alerts.push(action.payload);
    },

    removeAlert: (state, action: PayloadAction<string>) => {
      const idx = state.alerts.findIndex((elem) => elem.id === action.payload);
      if (idx !== -1) state.alerts.splice(idx, 1);
    },

    modifyAlert: (state, action: PayloadAction<stateTypes.Alert>) => {
      const idx = state.alerts.findIndex(
        (elem) => elem.id === action.payload.id,
      );
      if (idx !== -1) state.alerts[idx] = action.payload;
    },
  },
});

export const { addAlert, removeAlert, modifyAlert } = toastSlice.actions;
export default toastSlice.reducer;
