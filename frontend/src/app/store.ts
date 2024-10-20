import storage from "redux-persist/lib/storage";
import { persistStore, persistCombineReducers, PERSIST } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "../features/themeSlice";
import drawerReducer from "../features/drawerSlice";
import api from "../api/api";

/* local storage based persist config */
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["drawer"],
};

/* local storage persisted reducer */
const persistedReducer = persistCombineReducers(persistConfig, {
  theme: themeReducer,
  drawer: drawerReducer,
  [api.reducerPath]: api.reducer,
});

/* centralized state store */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }).concat(api.middleware),
});

/* store persistor */
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
