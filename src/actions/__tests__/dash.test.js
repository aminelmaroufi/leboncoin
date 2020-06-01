import * as types from "../../utils/types";
import { getBookings } from "../dash";

describe("Test get bookings action", () => {
  it("should create getBookings action with correct type", () => {
    const params = {};
    const expectedAction = {
      type: types.GET_BOOKINGS,
      params,
    };
    expect(getBookings(params)).toEqual(expectedAction);
  });
});
