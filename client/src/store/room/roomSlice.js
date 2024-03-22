import { createSlice } from "@reduxjs/toolkit";

// roomInfo: id, name, owner, members
const initialState = {
  roomInfo: localStorage.getItem("roomInfo")
    ? JSON.parse(localStorage.getItem("roomInfo"))
    : null,
  onlineMembers: localStorage.getItem("onlineMembers")
    ? JSON.parse(localStorage.getItem("onlineMembers"))
    : null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomInfo: (state, action) => {
      state.roomInfo = action.payload;
      localStorage.setItem("roomInfo", JSON.stringify(action.payload));
    },
    setOnlineMembers: (state, action) => {
      state.onlineMembers = action.payload;
      localStorage.setItem("onlineMembers", JSON.stringify(action.payload));
    },
  },
});

export const { setRoomInfo, setOnlineMembers } = roomSlice.actions;

export default roomSlice.reducer;
