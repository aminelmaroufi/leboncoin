import { all, takeLatest, put, call } from "redux-saga/effects";
import * as ActionTypes from "../utils/types";
import { getBookings } from "../api/dash";

/**
 *Get bookings saga
 */
function* get_bookings(action) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    const response = yield call(getBookings, action.params);
    const data = response.data;
    if (data.ok) {
      yield all([
        put({ type: ActionTypes.API_CALL_SUCCESS }),
        put({ type: ActionTypes.SET_BOOKINGS, bookings: data.result.bookings }),
      ]);
    } else {
      yield put({
        type: ActionTypes.API_CALL_FAILURE,
        message: data.message,
      });
    }
  } catch (e) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      message: e.message,
    });
  }
}

export default function* watchDashRequest() {
  yield all([takeLatest(ActionTypes.GET_BOOKINGS, get_bookings)]);
}
