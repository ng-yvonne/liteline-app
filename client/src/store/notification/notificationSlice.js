import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: null,
  color: null,
  autoDismiss: null,
  open: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setSuccessAlert: (state, action) => {
      state.content = action.payload;
      state.color = "success";
      state.autoDismiss = 6000;
      state.open = true;
    },
    setErrorAlert: (state, action) => {
      state.content = action.payload;
      state.color = "error";
      state.autoDismiss = null;
      state.open = true;
    },
    setWarningAlert: (state, action) => {
      state.content = action.payload;
      state.color = "warning";
      state.autoDismiss = null;
      state.open = true;
    },
    setInfoAlert: (state, action) => {
      state.content = action.payload;
      state.color = "info";
      state.autoDismiss = 6000;
      state.open = true;
    },
    resetNotification: (state, action) => {
      state.content = null;
      state.color = null;
      state.autoDismiss = null;
      state.open = false;
    },
  },
});

export const {
  setSuccessAlert,
  setErrorAlert,
  setWarningAlert,
  setInfoAlert,
  resetNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
