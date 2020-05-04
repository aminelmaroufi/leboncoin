import * as ActionTypes from "../utils/types";
const initialState = {
  bookings: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_BOOKINGS:
      return {
        ...state,
        bookings: action.bookings,
      };
    default:
      return state;
  }
}
