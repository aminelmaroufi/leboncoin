import * as ActionTypes from "../utils/types";
const initialState = {
  fetching: false,
  isLoggedIn: null,
  message: "",
  error: false,
  user: null,
  success: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.API_CALL_REQUEST:
      return {
        ...state,
        fetching: true,
        error: false,
        success: false,
        message: ""
      };
    case ActionTypes.API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        error: true,
        message: action.message
      };
    case ActionTypes.API_CALL_SUCCESS:
      return {
        ...state,
        fetching: false
      };
    case ActionTypes.SUCCESS_OPERATION:
      return {
        ...state,
        fetching: false,
        success: true,
        error: false,
        message: action.message
      };
    case ActionTypes.USER_NOT_CONNECTED:
      return {
        ...state,
        isLoggedIn: false,
        fetching: false,
        error: false,
        message: ""
      };
    default:
      return state;
  }
}
