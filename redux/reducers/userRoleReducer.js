import { USER_ROLE } from "../const";

const initialState = {
  role: "",
};

export default function userRoleReducer(state = initialState, action) {
  switch (action.type) {
    case USER_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
}
