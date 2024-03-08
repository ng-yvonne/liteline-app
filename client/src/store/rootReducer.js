import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authReducer from "./user/authSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
