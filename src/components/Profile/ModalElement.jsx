import { Modal, Button } from 'antd';
import React from "react";


import UpdateProfile from './UpdateProfile';

class ModalElement extends React.Component {
  state = {
    visible: false,
  };

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
    const { visible } = this.state;
    return (
      <div>
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
            <UpdateProfile userData={this.props.userData} />
          </Modal>
        </div>
      </div>
    );
  }
}

export default ModalElement;