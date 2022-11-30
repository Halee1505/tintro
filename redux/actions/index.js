import {
  EVENT_CHANGE,
  REGISTER_PHONE_NUMBER,
  SET_FILTER_VALUE,
  SHOW_FILTER,
} from "../const";

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

export function filterValue(value) {
  return {
    type: SET_FILTER_VALUE,
    payload: value,
  };
}

export function handleShowFilter(isShowFilter) {
  return {
    type: SHOW_FILTER,
    payload: isShowFilter,
  };
}
