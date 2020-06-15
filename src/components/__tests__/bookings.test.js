import React from "react";
import { MemoryRouter as Router, withRouter } from "react-router-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Bookings } from "../Bookings";

const search = jest.fn();

const max_price = "3,000€",
  dep = "Paris",
  price_min_value = "600€";

let renderer,
  form_title,
  dep_input,
  min_price_input,
  max_price_input,
  furnished_input,
  button_submit,
  details_title,
  map;

describe("BOOKINGS COMPONENTS", () => {
  beforeEach(() => {
    renderer = render(
      <Router>
        <Bookings onGetBookings={search} />
      </Router>
    );
    form_title = renderer.getByTestId("form-title");
    dep_input = renderer.getByTestId("dep-input");
    min_price_input = renderer.getByTestId("price-min");
    max_price_input = renderer.getByTestId("price-max");
    furnished_input = renderer.getByTestId("furnished-input");
    button_submit = renderer.getByTestId("submit-btn");
    details_title = renderer.getByTestId("submit-btn");
    map = renderer.getByTestId("map-container");
  });

  afterEach(cleanup);

  it("should render all form elements", () => {
    expect(form_title).toBeTruthy();
    expect(dep_input).toBeTruthy();
    expect(min_price_input).toBeTruthy();
    expect(max_price_input).toBeTruthy();
    expect(furnished_input).toBeTruthy();
    expect(button_submit).toBeTruthy();
    expect(map).toBeTruthy();
    expect(details_title).toBeTruthy();
    expect(renderer).toMatchSnapshot();
  });

  it("should update inputs value and call search event", () => {
    //check form input value is empty for each input
    expect(dep_input.value).toEqual("");
    expect(min_price_input.value).toEqual("0€");
    expect(max_price_input.value).toEqual(max_price);
    expect(furnished_input.value).toEqual("on");
    expect(button_submit.disabled).toBe(true);

    //fill form
    fireEvent.change(dep_input, { target: { value: dep } });
    fireEvent.change(min_price_input, { target: { value: price_min_value } });

    //check if input now are fiiled correctly
    expect(dep_input.value).toEqual(dep);
    expect(min_price_input.value).toEqual(price_min_value);
    expect(button_submit.disabled).toBe(false);

    fireEvent.click(button_submit);
    expect(search).toHaveBeenCalled();
    expect(search).toHaveBeenCalledTimes(1);
  });
});
