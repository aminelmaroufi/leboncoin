import * as types from "../../utils/types";
import auth from "../auth";

const error_message = "Error from API";

describe("Reducers", () => {
  const initialState = {
    fetching: false,
    isLoggedIn: null,
    message: "",
    error: false,
    user: null,
    success: false,
  };

  it("should return the initial state", () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  it("should handle 'API_CALL_REQUEST' action", () => {
    const expectedState = { ...initialState, fetching: true };
    expect(auth(undefined, { type: types.API_CALL_REQUEST })).toEqual(
      expectedState
    );
  });

  it("should handle 'API_CALL_SUCCESS' action", () => {
    expect(auth(undefined, { type: types.API_CALL_SUCCESS })).toEqual(
      initialState
    );
  });

  it("should handle 'API_CALL_FAILURE' action", () => {
    const expectedState = {
      ...initialState,
      error: true,
      message: error_message,
    };
    expect(
      auth(undefined, { type: types.API_CALL_FAILURE, message: error_message })
    ).toEqual(expectedState);
  });
});
