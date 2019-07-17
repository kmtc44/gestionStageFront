import React, { Component } from "react";
import "./App.css";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as action from "./store/actions/auth";
import { connect } from "react-redux";
import { LocaleProvider } from "antd";
import fr_FR from "antd/lib/locale-provider/fr_FR";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    return (
      <LocaleProvider locale={fr_FR}>
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
      </LocaleProvider>
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
