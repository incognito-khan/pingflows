import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import workspaceReducer from "./slices/workspaceSlice";
import leadReducer from "./slices/leadSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage"; // ✅ FIXED IMPORT

const rootReducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
  lead: leadReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
