import React, { Component } from "react";
import ReduxToastr, { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { css } from "@emotion/core";
import { DotLoader } from "react-spinners";
import Bookings from "./components/Bookings";

const override = css`
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  z-index: 999 !important;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.auth.fetching,
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
    success: state.auth.success,
    message: state.auth.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class App extends Component {
  componentDidUpdate(prevProps) {
    const { error, success, message } = this.props;
    if (success) toastr.success("Success Operation", message);
    else if (error) toastr.error("Error", message);
  }

  render() {
    const { isFetching } = this.props;

    return (
      <div>
        <Bookings />
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        {isFetching && (
          <div className="loader-container">
            <DotLoader
              css={override}
              sizeUnit={"px"}
              size={100}
              color={"#000"}
              loading={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
