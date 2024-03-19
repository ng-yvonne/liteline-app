import { createSlice } from "@reduxjs/toolkit";

// roomInfo: id, name, owner, members
const initialState = {
  roomInfo: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomInfo: (state, action) => {
      state.roomInfo = action.payload;
    },
  },
});

export const { setRoomInfo } = roomSlice.actions;

export default roomSlice.reducer;
