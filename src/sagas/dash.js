import { all, takeLatest, put, call } from "redux-saga/effects";
import * as ActionTypes from "../utils/types";
import { addList } from "../actions/dash";

/**
 *Get lists from localStorage
 */
function* get_lists() {
  try {
    let serializedState = localStorage.getItem("lists");

    if (serializedState !== null) {
      yield put({
        type: ActionTypes.SET_LIST,
        lists: JSON.parse(serializedState)
      });
    }
  } catch (e) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      message: e.message
    });
  }
}

/**
 * @description
 * Update lists on localStorage after adding list
 * @param  action
 */
function* add_list(action) {
  try {
    yield put({
      type: ActionTypes.API_CALL_REQUEST
    });
    const serializedList = JSON.stringify(action.lists);
    localStorage.setItem("lists", serializedList);

    yield all([
      put({
        type: ActionTypes.SUCCESS_OPERATION,
        message: action.messageType
      }),
      yield put({
        type: ActionTypes.ADD_LIST_SUCCESS,
        lists: action.lists
      })
    ]);
  } catch (e) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      message: e.message
    });
  }
}

/**
 * @description
 * Update lists on localStorage after deleting list
 * @param  action
 */
function* delete_list(action) {
  try {
    yield put({
      type: ActionTypes.API_CALL_REQUEST
    });
    const serializedList = JSON.stringify(action.lists);
    localStorage.setItem("lists", serializedList);

    yield all([
      put({
        type: ActionTypes.SUCCESS_OPERATION,
        message: "List deleted successfully"
      }),
      yield put({
        type: ActionTypes.DELETE_LIST_SUCCESS,
        lists: action.lists
      })
    ]);
  } catch (e) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      message: e.message
    });
  }
}

export default function* watchDashRequest() {
  yield all([
    takeLatest(ActionTypes.GET_LIST, get_lists),
    takeLatest(ActionTypes.ADD_LIST, add_list),
    takeLatest(ActionTypes.DELETE_LIST, delete_list)
  ]);
}
