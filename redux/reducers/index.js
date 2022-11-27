import eventChangeReducer from "./eventChangeReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  change: eventChangeReducer,
});

export default reducers;
