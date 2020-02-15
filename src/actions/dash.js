import * as ActionTypes from "../utils/types";

export const getLists = () => ({
  type: ActionTypes.GET_LIST
});

export const addList = lists => ({
  type: ActionTypes.ADD_LIST,
  lists
});

export const deleteList = lists => ({
  type: ActionTypes.DELETE_LIST,
  lists
});
