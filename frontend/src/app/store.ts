import storage from "redux-persist/lib/storage";
import { persistCombineReducers } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import api from "../api/api";
import persistStore from "redux-persist/es/persistStore";

/* local storage based persist config */
const persistConfig = {
  key: "root",
  storage,
};

/* local storage persisted reducer */
const persistedReducer = persistCombineReducers(persistConfig, {
  [api.reducerPath]: api.reducer,
});

/* centralized state store */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

/* store persistor */
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
