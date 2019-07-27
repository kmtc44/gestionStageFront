import { Modal, Button, Form, Input } from 'antd';
import React from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom'
import { baseSite } from '../../config'

import { Spin } from "antd";



class ModalSkills extends React.Component {
  state = {
    loading: true,
    visible: false,
    student: {},
    studentId: null,
  };

  componentDidMount() {

    const user = JSON.parse(localStorage.getItem("user"))
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${user.token}`
    }
    axios.get(`${baseSite}/auth/user`)
      .then(res => {
        this.setState({
          student: res.data,
          studentId: res.data.student.id,
          idDelete: {}
        });
        this.setState({ loading: false })
      })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post(`${baseSite}/skills/`, { name: e.target.elements.skills.value })
      .then(res => {
        console.log(res)
        axios.put(`${baseSite}/students/${this.state.studentId}/`, {
          skills: [res.data.id]
        })
          .then(res => console.log(res))
          .catch(err => console.log(err))
      })
      .catch(error => console.log(error));
    console.log(e.target.elements.skills.value)
  }

  handleDelete = (e) => {
    e.preventDefault();
    const idSkill = e.target.value
    console.log(e.target.value)
    axios.put(`${baseSite}/students/${this.state.studentId}/`, {
      skill: idSkill
    })
      .then(res => {
        console.log(res)
        this.setState({ visible: false })
        this.props.history.push('/dashboard/')
        this.props.history.push('/dashboard/profile')
      })
      .catch(err => console.log(err))
  }


  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        {
          loading ? (
            <Spin className="center container" />
          ) : (
              <div>
                <Button type="primary" onClick={this.showModal}>
                  Gérer les skills
              </Button>
                <Modal
                  visible={visible}
                  title="Modifier le profil/Skills"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      Annuler
                </Button>,
                  ]}
                >
                  <Form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <Form.Item label="Nom du Skill">
                      <Input name="skills" />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType='onSubmit'>Ajouter</Button>
                    </Form.Item>
                  </Form>

                  <strong>Compétences:</strong>
                  <div> {this.state.student.student.skills.map(skill => {
                    return (
                      <p>{skill.name}
                        <Button type="danger" value={skill.id} onClick={this.handleDelete} style={{ marginLeft: '5%' }} htmlType="onSubmit">
                          Retirer
                        </Button>
                      </p>
                    )
                  })}
                  </div>
                </Modal>
              </div>
            )
        }
      </div>
    );
  }
}

export default withRouter(ModalSkills);
