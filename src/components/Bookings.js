import React, { Component } from "react";
import { connect } from "react-redux";
import Currency from "react-currency-formatter";
import CurrencyFormat from "react-currency-format";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import Overlay from "pigeon-overlay";
import ReactMediumImg from "react-medium-zoom";
import { getBookings } from "../actions/dash";

const mapStateToProps = (state, ownProps) => {
  return {
    bookings: state.dash.bookings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetBookings: (params) => {
      dispatch(getBookings(params));
    },
  };
};

export class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBooking: null,
      query: {
        price_min: 0,
        price_max: 3000,
        dep: "",
        furnished: false,
      },
      disabled: true,
    };
  }

  _handleChange = (att, value) => {
    let { query } = this.state;
    query[att] = value;

    this.setState({ query }, () => this.validateFeilds());
  };

  validateFeilds = () => {
    const { query } = this.state,
      price_min = parseInt(query.price_min),
      price_max = parseInt(query.price_max);
    let { disabled } = this.state;

    if (query.dep && price_min > 0 && price_max > price_min) {
      disabled = false;
    } else {
      disabled = true;
    }
    this.setState({ disabled });
  };

  search = () => {
    const { query } = this.state;
    this.setState({ selectedBooking: null }, () => {
      this.props.onGetBookings(query);
    });
  };

  render() {
    const { query, disabled, selectedBooking } = this.state;
    const { bookings } = this.props;

    return (
      <div className="c-container">
        <div>
          {/*  filter */}
          <form className="form_container" style={{ paddingLeft: "20px" }}>
            <div className="" style={{ padding: "15px" }}>
              <h3
                data-testid="form-title"
                style={{ marginLeft: "25px", color: "#fff" }}
              >
                Filter bookings by :
              </h3>
              <div className="align-items-center">
                <div className="input-container">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Department (Ex. Paris...)"
                    data-testid="dep-input"
                    value={query.dep}
                    onChange={(e) => this._handleChange("dep", e.target.value)}
                  />
                </div>
                <div className="input-container">
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Price min"
                    data-testid="price-min"
                    value={query.price_min}
                    onChange={(e) =>
                      this._handleChange("price_min", e.target.value)
                    }
                  /> */}
                  <CurrencyFormat
                    className="form-control"
                    data-testid="price-min"
                    placeholder="Price min"
                    thousandSeparator={true}
                    suffix={"€"}
                    value={query.price_min}
                    onValueChange={(e) =>
                      this._handleChange("price_min", e.value)
                    }
                    required
                  />
                </div>
                <div className="input-container">
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Price max"
                    data-testid="price-max"
                    value={query.price_max}
                    onChange={(e) =>
                      this._handleChange("price_max", e.target.value)
                    }
                  /> */}
                  <CurrencyFormat
                    className="form-control"
                    placeholder="Price max"
                    data-testid="price-max"
                    thousandSeparator={true}
                    suffix={"€"}
                    value={query.price_max}
                    onValueChange={(e) =>
                      this._handleChange("price_max", e.value)
                    }
                    required
                  />
                </div>
                <div className="input-container" style={{ marginTop: "5px" }}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="autoSizingCheck2"
                      data-testid="furnished-input"
                      checked={query.furnished}
                      onChange={(e) =>
                        this._handleChange("furnished", !query.furnished)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="autoSizingCheck2"
                      style={{ fontSize: "13px", color: "#fff" }}
                    >
                      Furnished
                    </label>
                  </div>
                </div>
                <div className="btn_container">
                  <button
                    type="button"
                    className="btn btn-primary search-btn"
                    style={{
                      background: "white",
                      color: "#805ee4",
                      margin: "6px 0px",
                      float: "right",
                    }}
                    data-testid="submit-btn"
                    disabled={disabled}
                    onClick={() => this.search()}
                  >
                    Search for booking
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="map_container" data-testid="map-container">
            <Map
              center={[48.864716, 2.349014]}
              zoom={12}
              width={600}
              height={400}
            >
              {bookings &&
                bookings.length &&
                bookings.map((book) => {
                  return (
                    <Marker
                      key={book.id}
                      anchor={[book.location.lat, book.location.lng]}
                      payload={1}
                      onClick={({ event, anchor, payload }) =>
                        this.setState({ selectedBooking: book })
                      }
                    />
                  );
                })}

              <Overlay anchor={[48.864716, 2.349014]} offset={[120, 79]}>
                <img src="pigeon.jpg" width={240} height={158} alt="" />
              </Overlay>
            </Map>
          </div>
        </div>
        <div className="img_container">
          {bookings && bookings.length !== 0 && (
            <h3>Booking details (click on marker to show details):</h3>
          )}
          {selectedBooking &&
            selectedBooking.images.length &&
            selectedBooking.images.map((img) => {
              return (
                <ReactMediumImg
                  alt={"test"}
                  style={{ height: "200px", width: "300px" }}
                  src={img}
                />
              );
            })}

          <div style={{ marginTop: "20px" }}>
            {selectedBooking && selectedBooking.location && (
              <span style={{ marginRight: "10px" }}>
                City: {selectedBooking.location.city}
              </span>
            )}
            <br />
            {selectedBooking && selectedBooking && (
              <span>
                Price:{" "}
                <Currency quantity={selectedBooking.price} currency="EUR" />{" "}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
