import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Input, Select, Checkbox, Button, AutoComplete } from "antd";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    logo: null,
    sended: false,
    partner: false
  };

  onLogo(e) {
    console.log(e.target.files[0]);
    this.setState({ logo: e.target.files[0] });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const user = JSON.parse(localStorage.getItem("user"));
        axios.defaults.headers = {
          "Content-Type": " application/json",
          Authorization: `Token ${user.token}`
        };
        const enterprise = new FormData();
        if (values.is_partner) {
          enterprise.append("is_partner", values.is_partner);
          this.setState({ partner: true });
        }
        enterprise.append("name", values.name);
        enterprise.append("field", values.field);
        enterprise.append("email", values.email);
        enterprise.append("address", values.address);
        enterprise.append("website", values.website);
        enterprise.append("phone", values.phone);
        enterprise.append("leader_name", values.leader_name);
        enterprise.append("logo", this.state.logo);
        axios
          .post("http://localhost:8000/internship/enterprise/", enterprise)
          .then(res => {
            console.log(res);
            this.setState({ sended: true });
          })
          .catch(err => console.log(err));
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
      callback("Two passwords that you enter is inconsistent!");
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

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net", ".sn"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    if (this.state.sended && this.state.partner) {
      return <Redirect to="/dashboard/enterprise/partner" />;
    } else if (this.state.sended && !this.state.partner) {
      return <Redirect to="/dashboard/enterprise/potential" />;
    }
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 4 },
        sm: { span: 10 }
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
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "221"
    })(
      <Select style={{ width: 80 }}>
        <Option value="221">+221</Option>
        <Option value="53">+53</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div classNameName="container">
        <Row>
          <Col md="9" className="mx-auto">
            <Card>
              <CardHeader className="text-center">
                <h5>Ajouter une nouvelle entreprise</h5>
              </CardHeader>
              <CardBody>
                <Form
                  className="mr-10 p-5 text-left"
                  {...formItemLayout}
                  onSubmit={this.handleSubmit}
                >
                  <Form.Item label={<span>Nom de l'entreprise</span>}>
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message:
                            "S'il vous plaît entrer le nom de l'entreprise !",
                          whitespace: true
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>

                  <Form.Item label={<span>Domaine de l'entreprise</span>}>
                    {getFieldDecorator("field", {
                      rules: [
                        {
                          required: true,
                          message:
                            "S'il vous plaît entrer le domaine de l'entreprise !",
                          whitespace: true
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>

                  <Form.Item label={<span>Addresse de l'entrprise</span>}>
                    {getFieldDecorator("address", {
                      rules: [
                        {
                          required: true,
                          message:
                            "S'il vous plaît entrer l'adresse de l'entreprise !",
                          whitespace: true
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>

                  <Form.Item label={<span>Nom du Directeur </span>}>
                    {getFieldDecorator("leader_name", {
                      rules: [
                        {
                          required: true,
                          message:
                            "S'il vous plaît entrer le nom du directeur de l'entreprise !",
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
                  <Form.Item label="Website">
                    {getFieldDecorator("website", {
                      rules: [
                        { required: true, message: "Please input website!" }
                      ]
                    })(
                      <AutoComplete
                        dataSource={websiteOptions}
                        onChange={this.handleWebsiteChange}
                        placeholder="website"
                      >
                        <Input />
                      </AutoComplete>
                    )}
                  </Form.Item>

                  <Form.Item
                    label="Logo"
                    extra="mettre le logo de l'entreprise"
                  >
                    {getFieldDecorator("logo", {
                      valuePropName: "fileList",
                      getValueFromEvent: this.normFile
                    })(<input type="file" onChange={e => this.onLogo(e)} />)}
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator("is_partner", {
                      valuePropName: "checked"
                    })(<Checkbox>Entreprise partenaire</Checkbox>)}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Creer
                    </Button>
                  </Form.Item>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
