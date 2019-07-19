import {
  Form,
  Input,
  Select,
  Button,
} from 'antd';

import axios from "axios";
import React from "react";
import { Spin } from "antd";

import ModalSkills from './ModalSkills';

const { Option } = Select;

class RegistrationForm extends React.Component {

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  AddImage = (e) => {
    this.setState({ image: e.target.files[0] })
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
      fData.append("image", this.state.image)
      switch (this.props.userData.status) {
        case 'student':
          fData.append("address", values.address)
          fData.append("gender", values.gender)
          fData.append("socialStatus", values.socialStatus)
          axios.put(`http://127.0.0.1:8000/students/${this.props.userData.id}/`, fData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
          break;

        case 'framer':
          axios.put(`http://127.0.0.1:8000/framers/${this.props.userData.id}/`, fData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
          break;
        case 'teacher':
          axios.put(`http://127.0.0.1:8000/teachers/${this.props.userData.id}/`, fData)
            .then(res => console.log(res))
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
                    <>
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
                    </>
                  ) : ("")
                }


                <Form.Item label="Image de profil">
                  <input type="file" onChange={e => this.AddImage(e)} />
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

export default UpdateProfileForm;