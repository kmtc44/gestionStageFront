import React, { Component } from "react";
import { Form, Input, Select, Button } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as action from "../../store/actions/auth";

const { Option } = Select;

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
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
              "44"
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
              values.department
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
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {})(
      <Select style={{ width: 70 }}>
        <Option value="221">+221</Option>
      </Select>
    );

    return (
      <Form.Item className="container col-md-9  p-5">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label={<span>Nom d'utilisateur</span>}>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "S'il vous plaît entrer votre nom d'utilisateur !",
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
                  message: "S'il vous plaît entrer votre prenom !",
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
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          <Form.Item label="Phone Number">
            {getFieldDecorator("phone", {
              rules: [
                { required: true, message: "Please input your phone number!" }
              ]
            })(
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            )}
          </Form.Item>

          {this.props.location.pathname === "/register/student"
            ? this.classeSelector()
            : ""}
          {this.props.location.pathname === "/register/administration" ||
          this.props.location.pathname === "/register/student"
            ? this.departmentSelector()
            : ""}
          {this.props.location.pathname === "/register/enterprise" ? "" : ""}

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
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

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
      promotion
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
          promotion
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
      phone
    ) =>
      dispatch(
        action.authRegisterEnterprise(
          username,
          email,
          password,
          status,
          firstname,
          lastname,
          phone
        )
      )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(WrappedRegistrationForm);
