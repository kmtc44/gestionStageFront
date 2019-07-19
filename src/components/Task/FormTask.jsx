import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Input, Select, Button } from "antd";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import NotificationAlert from "react-notification-alert";

const { Option } = Select;
const baseSite = "http://localhost:8000";

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    logo: false,
    sended: false,
    partner: false,
    loading: true,
    projects: [],
    students: []
  };
  constructor(props) {
    super(props);
    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user: user });
    this.setState({ loading: true });
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${user.token}`
    };
    axios
      .get(`${baseSite}/project`)
      .then(res => {
        console.log(res.data);
        console.log(this.props.statusId);
        this.setState({
          projects: res.data.filter(
            project => project.framer.id === this.props.statusId
          )
        });
        axios
          .get(`${baseSite}/students`)
          .then(res1 => {
            this.setState({
              students: res1.data
                .filter(student => student.enterprise)
                .filter(
                  student => student.enterprise.id === this.props.enterpriseId
                )
            });
            this.setState({ loading: false });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
  componentWillReceiveProps(newProps) {

  }

  notify(place, message, type) {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        axios.defaults.headers = {
          "Content-Type": " application/json",
          Authorization: `Token ${this.state.user.token}`
        };

        axios
          .post(`${baseSite}/task/`, {
            title: values.title,
            description: values.description,
            students: values.students,
            framer: this.props.statusId,
            project: values.project
          })
          .then(res => {
            console.log(res);
            this.notify(
              "tc",
              `La tache  ${values.title} est cree avec succes`,
              "success"
            );
            setTimeout(() => {
              this.setState({ sended: true });
            }, 2000);
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
      return <Redirect to="/dashboard/task/all" />;
    }
    const { getFieldDecorator } = this.props.form;

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

    return (
      <div classNameName="container">
        <NotificationAlert ref="notificationAlert" />
        {this.state.loading ? (
          ""
        ) : (
            <Row>
              <Col md="9" className="mx-auto">
                <Card>
                  <CardHeader className="text-center">
                    <h5>Ajouter une nouvelle tache </h5>
                  </CardHeader>
                  <CardBody>
                    <Form
                      className="mr-10 p-5 text-left"
                      {...formItemLayout}
                      onSubmit={this.handleSubmit}
                    >
                      <Form.Item label={<span>Title de la tache</span>}>
                        {getFieldDecorator("title", {
                          rules: [
                            {
                              required: true,
                              message:
                                "S'il vous plaît entrer le titre de la tache !",
                              whitespace: true
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>

                      <Form.Item label={<span>Description de la tache</span>}>
                        {getFieldDecorator("description", {
                          rules: [
                            {
                              required: true,
                              message:
                                "S'il vous plaît entrer la desctiption de la tache !",
                              whitespace: true
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>

                      <Form.Item label="Selectionner le projet">
                        {getFieldDecorator("project", {
                          rules: [
                            {
                              required: false
                            }
                          ]
                        })(
                          <Select placeholder="Selectionner le projet">
                            {this.state.projects.map(project => {
                              return (
                                <Option value={project.id}>{project.name}</Option>
                              );
                            })}
                          </Select>
                        )}
                      </Form.Item>

                      <Form.Item label="Selectionner etudiants">
                        {getFieldDecorator("students", {
                          rules: [
                            {
                              required: true,
                              message: "Ajouter des etudiants !",
                              type: "array"
                            }
                          ]
                        })(
                          <Select
                            mode="multiple"
                            placeholder="Selectionner les etudiants"
                          >
                            {this.state.students.map(student => {
                              return (
                                <Option value={student.id}>
                                  {student.first_name} {student.last_name}
                                </Option>
                              );
                            })}
                          </Select>
                        )}
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

const WrappedTaskForm = Form.create({ name: "register" })(RegistrationForm);

const mapStateToProps = state => {
  return {
    statusId: state.statusId,
    enterpriseId: state.enterpriseId
  };
};

export default connect(mapStateToProps)(WrappedTaskForm);
