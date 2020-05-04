import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import Overlay from "pigeon-overlay";
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

class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.props.onGetBookings(query);
  };

  render() {
    const { query, disabled } = this.state;
    const { bookings } = this.props;
    return (
      <div>
        {/*  filter */}
        <form style={{ paddingLeft: "20px" }}>
          <div className="" style={{ padding: "15px" }}>
            <div className="form-row align-items-center">
              <div className="col-2 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Department"
                  value={query.dep}
                  onChange={(e) => this._handleChange("dep", e.target.value)}
                />
              </div>
              <div className="col-2 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price min"
                  value={query.price_min}
                  onChange={(e) =>
                    this._handleChange("price_min", e.target.value)
                  }
                />
              </div>
              <div className="col-2 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price max"
                  value={query.price_max}
                  onChange={(e) =>
                    this._handleChange("price_max", e.target.value)
                  }
                />
              </div>
              <div className="col-3" style={{ marginTop: "5px" }}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="autoSizingCheck2"
                    checked={query.furnished}
                    onChange={(e) =>
                      this._handleChange("furnished", !query.furnished)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="autoSizingCheck2"
                    style={{ fontSize: "13px" }}
                  >
                    Furnished
                  </label>
                </div>
                <div className="">
                  <button
                    type="button"
                    className="btn btn-primary search-btn"
                    style={{
                      background: "white",
                      color: "#805ee4",
                      margin: "6px 0px",
                      float: "right",
                    }}
                    disabled={disabled}
                    onClick={() => this.search()}
                  >
                    Search for booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Map center={[48.864716, 2.349014]} zoom={12} width={600} height={400}>
          {bookings.length &&
            bookings.map((book) => {
              return (
                <Marker
                  key={book.id}
                  anchor={[book.location.lat, book.location.lng]}
                  payload={1}
                  onClick={({ event, anchor, payload }) => {}}
                />
              );
            })}

          <Overlay anchor={[48.864716, 2.349014]} offset={[120, 79]}>
            <img src="pigeon.jpg" width={240} height={158} alt="" />
          </Overlay>
        </Map>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
