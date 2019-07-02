import React, { Component } from "react";
import "../../assets/css/home.css";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Menu from "./Menu";
import Login from "../auth/Login";
import Register from "../auth/Register";
import * as action from "../../store/actions/auth";
import Footer from "./Footer";
import Header from "./Header";

class Home extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <Header />
        <Switch>
          <Redirect exact from="/login" to="/" />
          <Redirect exact from="/register" to="/" />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Menu} />
          <Route path="/register" component={Register} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => {
      dispatch(action.authCheckState());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
