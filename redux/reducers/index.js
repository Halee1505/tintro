import eventChangeReducer from "./eventChangeReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  eventChangeReducer: eventChangeReducer,
});

export default reducers;
