import React, { Component } from "react";
import "./App.css";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as action from "./store/actions/auth";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/dashboard" component={Layout} />
          )} />
          <Route
            path="/"
            render={isAuthenticated => (
              <Home {...isAuthenticated} {...this.props} />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  console.log("L'etat state : ", state);
  return {
    isAuthenticated: state.token !== null,
    status: state.status,
    token: state.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => {
      dispatch(action.authCheckState());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
