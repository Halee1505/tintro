import { CREATE_NEW_ROOM } from "../const";

const initialState = {
  room: {},
};

export default function createNewRoomReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_NEW_ROOM:
      return {
        ...state,
        room: action.payload,
      };
    default:
      return state;
  }
}
