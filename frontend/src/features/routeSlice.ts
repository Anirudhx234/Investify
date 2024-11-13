import type { stateTypes, routerTypes } from "../types";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: stateTypes.Route = { attributes: null };

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRouteAttributes: (
      state,
      action: PayloadAction<routerTypes.Route | null>,
    ) => {
      state.attributes = action.payload;
    },
  },
});

export const { setRouteAttributes } = routeSlice.actions;
export default routeSlice.reducer;
