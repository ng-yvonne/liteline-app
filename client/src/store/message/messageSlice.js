import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: localStorage.getItem("messages")
    ? JSON.parse(localStorage.getItem("messages"))
    : null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload;
      localStorage.setItem("messages", JSON.stringify(action.payload));
    },
  },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;
