import * as ActionTypes from "../utils/types";
const initialState = {
  lists: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_LIST:
      return {
        ...state,
        lists: action.lists
      };
    case ActionTypes.ADD_LIST_SUCCESS:
      return {
        ...state,
        lists: action.lists
      };
    case ActionTypes.DELETE_LIST_SUCCESS:
      return {
        ...state,
        lists: action.lists
      };
    default:
      return state;
  }
}
