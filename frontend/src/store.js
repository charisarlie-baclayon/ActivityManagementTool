import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies), // i can the expiration of the cookie here
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedReducer,
  },
  middleware: [thunk].concat(apiSlice.middleware),
  devTools: true, // if in production false
});

export const persistor = persistStore(store);
