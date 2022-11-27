import { changeEvent } from "../actions";
import { EVENT_CHANGE } from "../const/index";
const initialState = {
  change: false,
};

export default function eventChangeReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_CHANGE:
      return {
        ...state,
        change: action.payload,
      };
    default:
      return state;
  }
}
