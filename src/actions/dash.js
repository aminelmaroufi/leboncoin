import * as ActionTypes from "../utils/types";

export const getBookings = (params) => ({
  type: ActionTypes.GET_BOOKINGS,
  params,
});
