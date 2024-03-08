import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from "./root-reducer";
import { apiSlice } from "./apiSlice";
import { serverErrorMiddleware } from "./serverErrorMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(serverErrorMiddleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
