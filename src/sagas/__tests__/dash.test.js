import "regenerator-runtime/runtime";

import recordSaga from "../recordSaga";
import { cleanup } from "@testing-library/react";
import * as types from "../../utils/types";
import { get_bookings } from "../dash";
import * as api from "../../api/dash";

const error_message = "Error from API";

afterEach(cleanup);

describe("Test Login Request", () => {
  api.getBookings = jest.fn();

  const action = {
    dep: "paris",
    price_min: 500,
    price_max: 1300,
    furnished: false,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should wait for every GET_BOOKINGS action and call get_bookings saga", async () => {
    const res = {
      data: {
        ok: true,
        result: {
          bookings: [],
        },
      },
    };
    api.getBookings.mockImplementation(() => Promise.resolve(res));

    const dispatched = await recordSaga(get_bookings, action);
    expect(api.getBookings).toHaveBeenCalledTimes(1);

    const expectedDispatched = [
      {
        type: types.API_CALL_REQUEST,
      },
      {
        type: types.API_CALL_SUCCESS,
      },
      { type: types.SET_BOOKINGS, bookings: [] },
    ];
    expect(dispatched).toEqual(expectedDispatched);
  });

  it("should get_bookings saga disptach failure", async () => {
    const res = {
      data: {
        ok: false,
        message: error_message,
        result: {
          data: {},
        },
      },
    };
    api.getBookings.mockImplementation(() => Promise.resolve(res));

    const dispatchedErr = await recordSaga(get_bookings, action);
    expect(api.getBookings).toHaveBeenCalledTimes(1);

    const expectedDispatchedErr = [
      {
        type: types.API_CALL_REQUEST,
      },
      {
        type: types.API_CALL_FAILURE,
        message: error_message,
      },
    ];
    expect(dispatchedErr).toEqual(expectedDispatchedErr);
  });
});
