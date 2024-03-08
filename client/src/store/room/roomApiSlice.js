import { apiSlice } from "../apiSlice";
const ROOMS_URL = "/api/rooms";

export const roomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    joinRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/join`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    leaveRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/leave`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    deleteRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/delete`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useDeleteRoomMutation,
} = roomsApiSlice;
