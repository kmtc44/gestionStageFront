import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Icon
} from 'antd';

import axios from "axios";
import React from "react";
import { Spin } from "antd";
import { withRouter } from 'react-router-dom';
import NotificationAlert from "react-notification-alert";
import { baseSite } from '../../config'

import ModalSkills from './ModalSkills';

const { Option } = Select;

class RegistrationForm extends React.Component {

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

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

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      const fData = new FormData()
      fData.append("first_name", values.firstname)
      fData.append("last_name", values.lastname)
      fData.append("phone", values.phone)
      if (this.state.image) {
        fData.append("image", this.state.image[0])
      }
      switch (this.props.userData.status) {
        case 'student':
          fData.append("address", values.address)
          fData.append("gender", values.gender)
          fData.append("socialStatus", values.socialStatus)
          axios.put(`${baseSite}/students/${this.props.userData.id}/`, fData)
            .then(res => {
              console.log(res)
              this.notify(
                "tc",
                `Votre profile a ete modifier avec success`,
                "success"
              );
              setTimeout(() => {
                this.props.history.push('dashboard')
                this.props.history.push('/dashboard/profile')
              }, 1000)
            })
            .catch(err => console.log(err));
          break;

        case 'framer':
          axios.put(`${baseSite}/framers/${this.props.userData.id}/`, fData)
            .then(res => {
              console.log(res)
              this.notify(
                "tc",
                `Votre profile a ete modifier avec success`,
                "success"
              );
              setTimeout(() => {
                this.props.history.push('dashboard')
                this.props.history.push('/dashboard/profile')
              }, 1000)
            })
            .catch(err => console.log(err));
          break;
        case 'teacher':
          axios.put(`${baseSite}/teachers/${this.props.userData.id}/`, fData)
            .then(res => {
              console.log(res)
              this.notify(
                "tc",
                `Votre profile a ete modifier avec success`,
                "success"
              );
              setTimeout(() => {
                this.props.history.push('dashboard')
                this.props.history.push('/dashboard/profile')
              }, 1000)
            })
            .catch(err => console.log(err));
          break;

        default:
          console.log('not normale')
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const { image } = this.state;

    const props = {
      beforeUpload: file => {
        this.setState({
          image: [file]
        });
        return false;
      },
      image,
    }

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+221',
    })(
      <Select style={{ width: 70 }}>
        <Option value="+221">+221</Option>
      </Select>,
    );
    return (
      <div>
        {
          this.state.loading ? (
            <Spin className="center container" />
          ) : (
              <Form {...formItemLayout} onSubmit={this.handleFormSubmit} >
                <NotificationAlert ref="notificationAlert" />
                <Form.Item label="Prénom">
                  {getFieldDecorator("firstname", {
                    initialValue: this.props.userData.first_name,
                    rules: [{ required: true, message: 'Please input your firstname!', whitespace: true }],
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="Nom">
                  {getFieldDecorator("lastname", {
                    initialValue: this.props.userData.last_name,
                    rules: [{ required: true, message: 'Please input your lastname!', whitespace: true }],
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="Phone Number">
                  {getFieldDecorator('phone', {
                    initialValue: this.props.userData.phone,
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                  })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                {
                  this.props.userData.status === 'student' ? (
                    <div>
                      <Form.Item label="Adresse">
                        {getFieldDecorator("address", {
                          initialValue: this.props.userData.address,
                          rules: [{ required: true, message: 'Please input your address!', whitespace: true }],
                        })(<Input />)}
                      </Form.Item>

                      <Form.Item
                        label="Genre">
                        {getFieldDecorator("gender", {
                          initialValue: this.props.userData.gender,
                          rules: [{ required: true, message: 'Please input your gender!', whitespace: true }],
                        })(<Select
                          name="gender"
                          style={{ width: '50%' }}>
                          <Option value="Masculin">Masculin</Option>
                          <Option value="Féminin">Féminin</Option>
                        </Select>)}
                      </Form.Item>

                      <Form.Item
                        label={<span>Etat civil:</span>}>
                        {getFieldDecorator("socialStatus", {
                          initialValue: this.props.userData.socialStatus,
                          rules: [{ required: true, message: 'Please input your social status!', whitespace: true }],
                        })(<Select
                          name="socialStatus"
                          style={{ width: '80%' }}>
                          <Option value="Célibataire sans enfant">Célibataire sans enfant</Option>
                          <Option value="Célibataire avec enfant">Célibataire avec enfant</Option>
                          <Option value="Marié(e) sans enfant">Marié(e) sans enfant</Option>
                          <Option value="Marié(e) avec enfant">Marié(e) avec enfant</Option>
                        </Select>)}
                      </Form.Item>
                    </div>
                  ) : ("")
                }


                <Form.Item label="Photo de profile ">

                  <Upload beforeUpload={props.beforeUpload} fileList={props.image}>
                    <Button>
                      <Icon type="upload" /> Image de profil
						        </Button>
                  </Upload>

                </Form.Item>

                {
                  this.props.userData.status === 'student' ? (
                    <Form.Item {...tailFormItemLayout}>
                      <ModalSkills></ModalSkills>
                    </Form.Item>) : ("")
                }

                <Form.Item {...tailFormItemLayout}>
                  <Button style={{ marginTop: "10%" }} type="primary" htmlType="submit">
                    Aplliquer les modifications
                  </Button>
                </Form.Item>
              </Form>
            )
        }
      </div>
    );
  }
}

const UpdateProfileForm = Form.create({ name: 'register' })(RegistrationForm);

export default withRouter(UpdateProfileForm);