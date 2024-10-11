import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";

import themeReducer from "../features/themeSlice";
import authReducer from "../features/authSlice";

/* Centralized state store */
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
