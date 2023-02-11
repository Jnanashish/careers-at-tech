import thunkMiddleware from "redux-thunk";
import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers/index";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV != "production",
    middleware: [thunkMiddleware],
});

export const persistor = persistStore(store);
export const dispatch = store.dispatch;
