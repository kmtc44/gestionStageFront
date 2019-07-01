import React, { Component } from "react";
import { Form, Icon, Input, Button, Spin } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as action from "../../store/actions/auth";

class Login extends Component {
  returnRegister(path) {
    if (path === "/login/student") {
      return <Link to="/register/student">Ouvrir un compte</Link>;
    } else if (path === "/login/administration") {
      return <Link to="/register/administration">Ouvrir un compte</Link>;
    } else if (path === "/login/enterprise") {
      return <Link to="/register/enterprise">Ouvrir un compte</Link>;
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      console.log("object");
      this.props.history.push("/");
    } else if (newProps.error) {
      console.log("auth error");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.toAuth(values.username, values.password);
        console.log("Received values of form: ", values);
        console.log(this.props.location.pathname);
        let status = null;
        switch (this.props.location.pathname) {
          case "/login/student":
            status = "student";
            break;
          case "/login/administration":
            status = "teacher";
            break;
          case "/login/enterprise":
            status = "framer";
            break;
          default:
            console.log("error");
        }
        this.props.toAuth(values.username, values.password, status);
        // this.props.history.push("/");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p> {this.props.error} </p>;
    }
    return (
      <div className="container">
        <hr /> <br />
        {errorMessage}
        {this.props.loading ? (
          <Spin className="container text-justify" />
        ) : (
          <Form
            onSubmit={this.handleSubmit}
            className="login-form container col-md-9 p-5"
          >
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Entrer un username valide SVP!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                  className="form-inline"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Entrez vun mot de passe valide SVP!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Connecter
              </Button>{" "}
              <br />
              Vous n'avez pas de compte ?{" "}
              {this.returnRegister(this.props.location.pathname)}
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    etat: state,
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toAuth: (username, password, status) =>
      dispatch(action.authLogin(username, password, status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
