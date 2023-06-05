import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { nodeAPI } from "../services/nodeAPI";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import userReducer from './user';

const reducers = combineReducers({
  [nodeAPI.reducerPath]: nodeAPI.reducer,
  user: userReducer
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["nodeAPI"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const apiStore = configureStore({
  reducer: persistedReducer,

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(nodeAPI.middleware),
});

setupListeners(apiStore.dispatch);
