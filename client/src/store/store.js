import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from "./rootReducer";
import { apiSlice } from "./apiSlice";
import { serverErrorMiddleware } from "./serverErrorMiddleware";

const reducerProxy = (state, action) => {
  if (action.type === "RESET") {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

const store = configureStore({
  reducer: reducerProxy,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(serverErrorMiddleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
