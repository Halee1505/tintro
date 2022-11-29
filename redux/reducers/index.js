import eventChangeReducer from "./eventChangeReducer";
import { combineReducers } from "redux";
import registerPhoneReducer from "./registerPhoneReducer";

const reducers = combineReducers({
  eventChangeReducer: eventChangeReducer,
  registerPhoneReducer: registerPhoneReducer,
});

export default reducers;
