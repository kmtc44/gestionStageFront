import React from "react";
import { Button, Modal, Form, Select, Spin } from "antd";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "../../assets/css/login.css";
import PropTypes from "prop-types";
import { baseSite } from '../../config'

const { Option } = Select;


const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Ajouter des etudiants dans cette entreprise"
          okText="Ajouter"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
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
                  {this.props.students.map(student => {
                    return (
                      <Option key={student.id} value={student.id}>
                        {student.first_name} {student.last_name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class CollectionsPage extends React.Component {
  state = {
    visible: false,
    students: [],
    loading: false,
    user: {}
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user: user });
    this.setState({ loading: true });
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${user.token}`
    };
    axios
      .get(`${baseSite}/students`)
      .then(res => {
        this.setState({ students: res.data });
        this.setState({ loading: false });
        console.log(this.state.students);
      })
      .catch(err => console.log(err));
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.state.user.token}`
      };
      axios
        .put(`${baseSite}/internship/enterprise/${this.props.enterpriseId}/`, {
          students: values.students
        })
        .then(res => {
          console.log(res);
          form.resetFields();
          this.props.history.push(`/dashboard/enterprise/detail/`);
          this.props.history.push(
            `/dashboard/enterprise/detail/${this.props.enterpriseId}`
          );
          this.setState({ visible: false });
        });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    if (this.state.loading) {
      return <Spin className="center container" />;
    }
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Ajouter des eleves
        </Button>
        <CollectionCreateForm
          students={this.state.students}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

CollectionsPage.propTypes = {
  enterpriseId: PropTypes.number
};
export default withRouter(CollectionsPage);
