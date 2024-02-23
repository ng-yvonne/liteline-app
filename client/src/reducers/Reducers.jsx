import { combineReducers } from "redux";
import { UPDATE_USERNAME } from "../actions/ActionTypes";

const usernameReducer = (state = "Anonymous", action) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  username: usernameReducer,
});

export default rootReducer;
