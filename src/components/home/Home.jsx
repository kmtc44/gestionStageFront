import React, { Component } from "react";
import "../../assets/css/home.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Menu from "./Menu";
import Login from "../auth/Login";
import Register from "../auth/Register";

import * as action from "../../store/actions/auth";
import { Button } from "antd";

class Home extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button onClick={this.props.logout}> Logout </Button>
        ) : (
          <Switch>
            <Redirect exact from="/login" to="/" />
            <Redirect exact from="/register" to="/" />
            <Route exact path="/" component={Menu} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect to="/" />
          </Switch>
        )}
      </div>
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
    },
    logout: () => {
      dispatch(action.authLogout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
