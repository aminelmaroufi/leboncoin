import { fork, all } from "redux-saga/effects";
import watchDashRequest from "./dash";

export default function* rootSaga() {
  yield all([fork(watchDashRequest)]);
}
