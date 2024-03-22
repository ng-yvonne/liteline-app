import { apiSlice } from "../apiSlice";
const ROOMS_URL = "/api/rooms";

export const roomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Room"],
    }),
    joinRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/join`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Room", "Message"],
    }),
    leaveRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/leave`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Room"],
    }),
    deleteRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/delete`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Room"],
    }),
    getRoom: builder.query({
      query: (id) => ({
        url: `${ROOMS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useDeleteRoomMutation,
  useGetRoomQuery,
} = roomsApiSlice;
