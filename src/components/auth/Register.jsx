import React, { Component } from "react";
import { Form, Input, Select, Button, Spin, DatePicker } from "antd";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Alert } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

import * as action from "../../store/actions/auth";
import "../../assets/css/login.css";

const { Option } = Select;
const baseSite = "http://localhost:8000";
class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    loading: true,
    enterprises: null
  };

  returnLogin(path) {
    if (path === "/register/student") {
      return <Link to="/login/student">Se connecter</Link>;
    } else if (path === "/register/administration") {
      return <Link to="/login/administration">Se connecter</Link>;
    } else if (path === "/register/enterprise") {
      return <Link to="/login/enterprise">Se connecter</Link>;
    }
  }

  componentDidMount() {
    if (this.props.location.pathname === "/register/student") {
      this.setState({ status: "Etudiant" });
      this.setState({ icon: "now-ui-icons education_hat" });
    } else if (this.props.location.pathname === "/register/administration") {
      this.setState({ status: "Administration de l'EPT" });
      this.setState({ icon: "now-ui-icons ui-1_settings-gear-63" });
    } else if (this.props.location.pathname === "/register/enterprise") {
      this.setState({ status: "Entreprise" });
      this.setState({ icon: "now-ui-icons business_bulb-63" });
    }

    axios
      .get(`${baseSite}/internship/enterprise/register`)
      .then(res => {
        this.setState({
          enterprises: res.data
        });

        console.log(this.state.students);
        this.setState({ loading: false });
      })
      .catch(err => console.log(err));
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values["date-picker"]) {
          values = {
            ...values,
            birthday: values["date-picker"].format("YYYY-MM-DD")
          };
        }
        console.log("Received values of form: ", values);
        let status = null;
        switch (this.props.location.pathname) {
          case "/register/student":
            status = "student";
            this.props.toAuthStudent(
              values.username,
              values.email,
              values.password,
              status,
              values.firstname,
              values.lastname,
              values.phone,
              values.department,
              values.classe,
              "44",
              values.birthday
            );
            break;
          case "/register/administration":
            status = "teacher";
            this.props.toAuthAdministraion(
              values.username,
              values.email,
              values.password,
              status,
              values.firstname,
              values.lastname,
              values.phone,
              values.department
            );
            break;
          case "/register/enterprise":
            status = "framer";
            this.props.toAuthEnterprise(
              values.username,
              values.email,
              values.password,
              status,
              values.firstname,
              values.lastname,
              values.phone,
              values.enterprise
            );
            break;
          default:
            console.log("pas normale");
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Deux mots de passe que vous entrez sont incohérents!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  departmentSelector = () => {
    return (
      <Form.Item label="Departement">
        {this.props.form.getFieldDecorator("department", {
          rules: [
            {
              required: true,
              message: "S'il vous plaît entrer votre departement"
            }
          ]
        })(
          <Select initialValue="" style={{ width: 120 }}>
            <Option value="GIT">GIT</Option>
            <Option value="GEM">GEM</Option>
            <Option value="GC">GC</Option>
          </Select>
        )}
      </Form.Item>
    );
  };

  framerEnterprise = () => {
    return (
      <Form.Item label="Selectionner votre entreprise">
        {this.props.form.getFieldDecorator("enterprise", {
          rules: [
            {
              required: true,
              message: "Selectionner votre enterprise!"
            }
          ]
        })(
          <Select placeholder="Entreprise">
            {this.state.enterprises.map(enterprise => {
              return <Option value={enterprise.id}>{enterprise.name}</Option>;
            })}
          </Select>
        )}
      </Form.Item>
    );
  };

  classeSelector = () => {
    return (
      <Form.Item label="Classe">
        {this.props.form.getFieldDecorator("classe", {
          rules: [
            { required: true, message: "S'il vous plaît entrer votre classe!" }
          ]
        })(
          <Select initialValue="" style={{ width: 120 }}>
            <Option value="TC2">TC2</Option>
            <Option value="DIC1">DIC1</Option>
            <Option value="DIC2">DIC2</Option>
            <Option value="DIC3">DIC3 </Option>
          </Select>
        )}
      </Form.Item>
    );
  };

  birthdayAsk = () => {
    return (
      <Form.Item label="Date de naissance">
        {this.props.form.getFieldDecorator("date-picker", {
          rules: [
            {
              type: "object",
              required: true,
              message: "S'il vous plait entrer votre date de naissance !"
            }
          ]
        })(<DatePicker />)}
      </Form.Item>
    );
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <Alert
          className="container mx-auto"
          message="Erreur !!!"
          description={this.props.error}
          type="error"
          showIcon
        />
      );
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,
          offset: 0
        },
        sm: {
          span: 10,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {})(
      <Select style={{ width: 80 }}>
        <Option value="221">+221</Option>
      </Select>
    );

    return (
      <div classNameName="container">
        {this.state.loading ? (
          <Spin className="center container " />
        ) : (
          <Row>
            <Col md="9" lg="6" className="mx-auto p-5 m-2">
              <Card>
                <CardHeader className="text-center">
                  <h1>
                    <i className={this.state.icon} />
                  </h1>{" "}
                  <h5>Ouverture de compte pour {this.state.status}</h5>
                </CardHeader>
                <CardBody>
                  <br />
                  {errorMessage}
                  {this.props.loading ? (
                    <Spin className="center container " />
                  ) : (
                    <Form.Item className="p-2">
                      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label={<span>Nom d'utilisateur</span>}>
                          {getFieldDecorator("username", {
                            rules: [
                              {
                                required: true,
                                message:
                                  "S'il vous plaît entrer votre nom d'utilisateur !",
                                whitespace: true
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>

                        <Form.Item label={<span>Prenom</span>}>
                          {getFieldDecorator("firstname", {
                            rules: [
                              {
                                required: true,
                                message:
                                  "S'il vous plaît entrer votre prenom !",
                                whitespace: true
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>

                        <Form.Item label={<span>Nom</span>}>
                          {getFieldDecorator("lastname", {
                            rules: [
                              {
                                required: true,
                                message: "S'il vous plaît entrer votre nom !",
                                whitespace: true
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>

                        <Form.Item label="E-mail">
                          {getFieldDecorator("email", {
                            rules: [
                              {
                                type: "email",
                                message: "L'entrée n'est pas valide E-mail!"
                              },
                              {
                                required: true,
                                message: "S'il vous plaît entrer votre e-mail!"
                              }
                            ]
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Mot de passe" hasFeedback>
                          {getFieldDecorator("password", {
                            rules: [
                              {
                                required: true,
                                message:
                                  "S'il vous plaît entrer votre mot de passe!"
                              },
                              {
                                validator: this.validateToNextPassword
                              }
                            ]
                          })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item
                          label="Confirmer votre mot de passe"
                          hasFeedback
                        >
                          {getFieldDecorator("confirm", {
                            rules: [
                              {
                                required: true,
                                message:
                                  "S'il vous plaît confirmer votre mot de passe!"
                              },
                              {
                                validator: this.compareToFirstPassword
                              }
                            ]
                          })(
                            <Input.Password onBlur={this.handleConfirmBlur} />
                          )}
                        </Form.Item>

                        <Form.Item label="Phone Number">
                          {getFieldDecorator("phone", {
                            rules: [
                              {
                                required: true,
                                message:
                                  "S'il vous plaît entrer votre numero de telephone!"
                              }
                            ]
                          })(
                            <Input
                              addonBefore={prefixSelector}
                              style={{ width: "100%" }}
                            />
                          )}
                        </Form.Item>

                        {this.props.location.pathname === "/register/student"
                          ? this.classeSelector()
                          : ""}
                        {this.props.location.pathname === "/register/student"
                          ? this.birthdayAsk()
                          : ""}
                        {this.props.location.pathname ===
                          "/register/administration" ||
                        this.props.location.pathname === "/register/student"
                          ? this.departmentSelector()
                          : ""}
                        {this.props.location.pathname === "/register/enterprise"
                          ? this.framerEnterprise()
                          : ""}

                        <Form.Item {...tailFormItemLayout}>
                          <Button type="primary" htmlType="submit">
                            Envoyer
                          </Button>{" "}
                          <br />
                          Vous avez deja un compte ?{" "}
                          {this.returnLogin(this.props.location.pathname)}
                        </Form.Item>
                      </Form>
                    </Form.Item>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

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
    toAuthStudent: (
      username,
      email,
      password,
      status,
      firstname,
      lastname,
      phone,
      department,
      classe,
      promotion,
      birthday
    ) =>
      dispatch(
        action.authRegisterStudent(
          username,
          email,
          password,
          status,
          firstname,
          lastname,
          phone,
          department,
          classe,
          promotion,
          birthday
        )
      ),
    toAuthAdministraion: (
      username,
      email,
      password,
      status,
      firstname,
      lastname,
      phone,
      department
    ) =>
      dispatch(
        action.authRegisterAdministration(
          username,
          email,
          password,
          status,
          firstname,
          lastname,
          phone,
          department
        )
      ),
    toAuthEnterprise: (
      username,
      email,
      password,
      status,
      firstname,
      lastname,
      phone,
      enterprise
    ) =>
      dispatch(
        action.authRegisterEnterprise(
          username,
          email,
          password,
          status,
          firstname,
          lastname,
          phone,
          enterprise
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
