import { UPDATE_USERNAME } from "./ActionTypes";

export const updateUsername = (newUsername) => ({
  type: UPDATE_USERNAME,
  payload: newUsername,
});
