import { EVENT_CHANGE } from "../const";

export function changeEvent(event) {
  return {
    type: EVENT_CHANGE,
    payload: event,
  };
}
