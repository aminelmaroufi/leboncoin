import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import auth from "./auth";
import dash from "./dash";

const routReducer = combineReducers({
  toastr: toastrReducer,
  auth,
  dash
});

export default routReducer;
