import React, { Component } from "react";
import { Form, Icon, Input, Button, Spin } from "antd";
import { connect } from "react-redux";
import { Alert } from "antd";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import * as action from "../../store/actions/auth";
import "../../assets/css/login.css";

class Login extends Component {
  state = {};
  returnRegister(path) {
    if (path === "/login/student") {
      return <Link to="/register/student">Ouvrir un compte</Link>;
    } else if (path === "/login/administration") {
      return <Link to="/register/administration">Ouvrir un compte</Link>;
    } else if (path === "/login/enterprise") {
      return <Link to="/register/enterprise">Ouvrir un compte</Link>;
    }
  }
  componentDidMount() {
    if (this.props.location.pathname === "/login/student") {
      this.setState({ status: "Etudiant" });
      this.setState({ icon: "now-ui-icons education_hat" });
    } else if (this.props.location.pathname === "/login/administration") {
      this.setState({ status: "Administration de l'EPT" });
      this.setState({ icon: "now-ui-icons ui-1_settings-gear-63" });
    } else if (this.props.location.pathname === "/login/enterprise") {
      this.setState({ status: "Entreprise" });
      this.setState({ icon: "now-ui-icons business_bulb-63" });
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
        console.log(this.props.location.pathname);
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
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <Alert
          message="Erreur !!!"
          description={this.props.error}
          type="error"
          showIcon
        />
      );
    }
    return (
      <div >
        <Row>
          <Col md="9" lg="6" className="mx-auto p-5 m-2">
            <Card>
              <CardHeader className="text-center">
                <h1>
                  <i className={this.state.icon} />
                </h1>{" "}
                <h5>Espace de connexion pour {this.state.status} </h5>
              </CardHeader>
              <CardBody>
                <br />
                {errorMessage}
                {this.props.loading ? (
                  <Spin className="center container " />
                ) : (
                    <Form
                      onSubmit={this.handleSubmit}
                      className="login-form container col-md-9 p-5"
                    >
                      <Form.Item>
                        {getFieldDecorator("username", {
                          rules: [
                            {
                              required: true,
                              message: "Entrer un username valide SVP!"
                            }
                          ]
                        })(
                          <Input
                            prefix={
                              <Icon
                                type="user"
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
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
                              <Icon
                                type="lock"
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
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
              </CardBody>
            </Card>
          </Col>
        </Row>
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
      dispatch(action.authLogin(username, password, status)),
    checkAuth: () => {
      dispatch(action.authCheckState());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
