import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
  }),
  tagTypes: ["User", "Room", "Message"],
  endpoints: (builder) => ({}),
  refetchOnReconnect: true,
});
