import { Modal, Button } from 'antd';
import React from "react";
import axios from "axios";

import { Spin } from "antd";

import UpdateProfile from './UpdateProfile';

class ModalElement extends React.Component {
  state = {
    loading: false,
    visible: false,
    student: {},
    load: true
  };

  componentDidMount() {

    const user = JSON.parse(localStorage.getItem("user"))
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization:  `Token ${user.token}`
    }
    axios.get(`http://127.0.0.1:8000/auth/user`)
      .then(res => {
        this.setState({
          student: res.data
        });

        this.setState({load : false})
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

  render() {
    const { visible, loading } = this.state;
    return (
     <div>

           {
            this.state.load === false ? (
        
            <div>
              <Button type="primary" block onClick={this.showModal}>
                Modifier profil
              </Button>
              <Modal
                visible={visible}
                title="Modifier le profil"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" onClick={this.handleCancel}>
                    Annuler
                  </Button>,
                ]}
              >
                <UpdateProfile requestType="put" userID={this.state.student.student.id}>  </UpdateProfile>
              </Modal>
            </div>
          
          ) : <Spin className="center container" /> 
      } 
      </div>
      );
    
}
}

export default ModalElement;