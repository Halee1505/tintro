import { SET_FILTER_VALUE } from "../const/index";
const initialState = {
  filterValue: {
    fromPrice: 0,
    toPrice: 0,
    benefit: [],
    sort: "",
  },
};

export default function filterValueReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.payload,
      };
    default:
      return state;
  }
}
