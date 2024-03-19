import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import userReducer from "./user/userSlice";
import roomReducer from "./room/roomSlice";
import notificationReducer from "./notification/notificationSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
  notification: notificationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
