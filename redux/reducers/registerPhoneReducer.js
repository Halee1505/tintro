import { REGISTER_PHONE_NUMBER } from "../const/index";
const initialState = {
  phoneNumber: "",
};

export default function registerPhoneReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    default:
      return state;
  }
}
