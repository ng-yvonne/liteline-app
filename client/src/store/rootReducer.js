import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authReducer from "./user/authSlice";
import roomReducer from "./room/roomSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  room: roomReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
