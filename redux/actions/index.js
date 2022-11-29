import { EVENT_CHANGE, REGISTER_PHONE_NUMBER } from "../const";

export function changeEvent(event) {
  return {
    type: EVENT_CHANGE,
    payload: event,
  };
}

export function registerPhoneNumber(phoneNumber) {
  return {
    type: REGISTER_PHONE_NUMBER,
    payload: phoneNumber,
  };
}
