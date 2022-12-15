import eventChangeReducer from "./eventChangeReducer";
import { combineReducers } from "redux";
import registerPhoneReducer from "./registerPhoneReducer";
import filterValueReducer from "./filterValueReducer";
import showFilterReducer from "./showFilterReducer";
import userRoleReducer from "./userRoleReducer";
import loginUserReducer from "./loginUserReducer";
import createNewRoomReducer from "./createNewRoomReducer";
const reducers = combineReducers({
  eventChangeReducer: eventChangeReducer,
  registerPhoneReducer: registerPhoneReducer,
  filterValueReducer: filterValueReducer,
  showFilterReducer: showFilterReducer,
  userRoleReducer: userRoleReducer,
  loginUserReducer: loginUserReducer,
  createNewRoomReducer: createNewRoomReducer,
});

export default reducers;
