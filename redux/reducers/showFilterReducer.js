import { SHOW_FILTER } from "../const/index";
const initialState = {
  isShowFilter: false,
};

export default function showFilterReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_FILTER:
      return {
        ...state,
        isShowFilter: action.payload,
      };
    default:
      return state;
  }
}
