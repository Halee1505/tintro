import { LOGIN_USER } from "../const";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    phone: "",
    remember: false,
  },
};

export default function loginUserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
