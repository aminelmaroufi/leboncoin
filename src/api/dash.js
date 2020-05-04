import adapter from "../utils/adapter";

export const getBookings = (params) => {
  const query = `dep=${params.dep}&price_min=${parseInt(
    params.price_min
  )}&price_max=${parseInt(params.price_max)}&furnished=${params.furnished}`;
  return adapter.get(`/leboncoin/bookings?${query}`).catch((err) => {
    let error;
    if (typeof err === "string") error.message = err;
    else
      error = err.response.data.message
        ? err.response.data.message
        : err.response.data.result;
    return Promise.reject(error);
  });
};
