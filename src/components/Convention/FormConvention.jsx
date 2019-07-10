import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Input, Select, Spin, Button, InputNumber } from "antd";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

const { Option } = Select;
const baseSite = "http://localhost:8000";
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    loading: false,
    logo: null,
    sended: false,
    partner: false,
    enterprises: []
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user });
    this.setState({ loading: true });
    axios.defaults.headers = {
      "Content-Type": "Application/json",
      Authorization: `Token ${user.token}`
    };
    axios
      .get(`${baseSite}/internship/enterprise`)
      .then(res => {
        this.setState({ enterprises: res.data });
        this.setState({ loading: false });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        axios.defaults.headers = {
          "Content-Type": "Application/json",
          Authorization: `Token ${this.state.user.token}`
        };
        axios
          .post(`${baseSite}/internship/convention/`, {
            title: values.title,
            enterprise: values.enterprise,
            life_time: values.life_time,
            state: "R"
          })
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

  render() {
    if (this.state.sended) {
      return <Redirect to="/dashboard/conventions/all" />;
    }
    const { getFieldDecorator } = this.props.form;

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
          span: 8,
          offset: 1
        },
        sm: {
          span: 8,
          offset: 1
        }
      }
    };

    return (
      <div classNameName="container">
        {this.state.loading ? (
          <Spin className="center container" />
        ) : (
          <Row>
            <Col md="9" className="mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <h5>Ajouter une nouvelle convention</h5>
                </CardHeader>
                <CardBody>
                  <Form
                    className="mr-10 p-5 text-center"
                    {...formItemLayout}
                    onSubmit={this.handleSubmit}
                  >
                    <Form.Item label={<span>Titre de la convention</span>}>
                      {getFieldDecorator("title", {
                        rules: [
                          {
                            required: true,
                            message:
                              "S'il vous plaît entrez le nom de la convention !",
                            whitespace: true
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>

                    <Form.Item label="Select" hasFeedback>
                      {getFieldDecorator("enterprise", {
                        rules: [
                          {
                            required: true,
                            message:
                              "S'il vous plait choisissez l'entreprise  !"
                          }
                        ]
                      })(
                        <Select placeholder="Please select a country">
                          {this.state.enterprises.map((enterprise, index) => {
                            return (
                              <Option key={index} value={enterprise.id}>
                                {enterprise.name}
                              </Option>
                            );
                          })}
                        </Select>
                      )}
                    </Form.Item>

                    <Form.Item label="Nombre d'annees">
                      {getFieldDecorator("life_time", { initialValue: 0 })(
                        <InputNumber min={0} max={10} />
                      )}
                      <span className="ant-form-text"> Annees</span>
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
        )}
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
