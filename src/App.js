import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import ReduxToastr, { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import Lists from "./components/Lists";

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.auth.fetching,
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
    success: state.auth.success,
    message: state.auth.message
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class App extends Component {
  componentDidUpdate(prevProps) {
    const { error, success, message } = this.props;
    if (success) toastr.success("Success Operation", message);
    else if (error) toastr.error("Error", message);
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="searchContainer">
            <h3 className={css(styles.title)}>Tableau Reezocar</h3>
            <i className="fa fa-search"></i>
          </div>
          <div className="logo-container">
            <img
              width="200px"
              height="20px"
              src={require("./assets/trello.svg")}
              alt=""
            />
          </div>
        </div>
        <Lists />
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
