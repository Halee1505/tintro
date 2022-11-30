import eventChangeReducer from "./eventChangeReducer";
import { combineReducers } from "redux";
import registerPhoneReducer from "./registerPhoneReducer";
import filterValueReducer from "./filterValueReducer";
import showFilterReducer from "./showFilterReducer";
const reducers = combineReducers({
  eventChangeReducer: eventChangeReducer,
  registerPhoneReducer: registerPhoneReducer,
  filterValueReducer: filterValueReducer,
  showFilterReducer: showFilterReducer,
});

export default reducers;
