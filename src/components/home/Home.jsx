import React, { Component } from "react";
import "../../assets/css/home.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Menu from "./Menu";
import Login from "../auth/Login";
import Register from "../auth/Register";

import * as action from "../../store/actions/auth";

class Home extends Component {
  componentDidMount() {
    this.props.checkAuth();
    console.log("votre status est : ", this.props.status);
    console.log("votre auth  : ", this.props.isAuthenticated);
  }
  render() {
    return (
      <Switch>
        <Redirect exact from="/login" to="/" />
        <Redirect exact from="/register" to="/" />
        <Route exact path="/" component={Menu} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  console.log("L'etat state : ", state);
  return {
    isAuthenticated: state.token !== null,
    status: state.status
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
)(Home);
