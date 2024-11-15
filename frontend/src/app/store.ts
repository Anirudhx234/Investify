import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import themeReducer from "../features/themeSlice";
import routeReducer from "../features/routeSlice";
import clientReducer from "../features/clientSlice";
import toastReducer from "../features/toastSlice";

import { api } from "../api/api";

/* local storage based persist config */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "client"],
};

/* local storage persisted reducer */
const persistedReducer = persistCombineReducers(persistConfig, {
  theme: themeReducer,
  route: routeReducer,
  client: clientReducer,
  toast: toastReducer,
  [api.reducerPath]: api.reducer,
});

/* centralized state store */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

/* store persistor */
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
