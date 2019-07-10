import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import axios from "axios";
import React, { Component } from "react";
import { Spin } from "antd";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    student: {},
    loading: true
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

        this.setState({loading : false})
      })
  }




  handleFormSubmit = (event, requestType, userID) =>{
    // event.preventDefault()
    const firstname = event.target.elements.firstname.value;
    const lastname = event.target.elements.lastname.value;
    const phone = event.target.elements.phone.value;

    axios.put(`http://127.0.0.1:8000/students/${userID}/`, {
        first_name: firstname,
        last_name: lastname,
        phone: phone,
      })
    .then(res => console.log(res))
    .catch(error => console.log(error));

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
      initialValue: '',
    })(
      <Select style={{ width: 70 }}>
        <Option value="+221">+221</Option>
      </Select>,
    );


    return (
       <div>
       {
      this.state.loading === false ? (

      <Form onSubmit={(event) => this.handleFormSubmit(
        event,
        this.props.requestType,
        this.props.userID    )} {...formItemLayout } >

        <Form.Item
          label={
            <span>
              Prénom:
            </span>
          }
          
        >
          {getFieldDecorator("Prénom", {
            initialValue:this.state.student.student.first_name,
            rules: [{ required: true, message: 'Please input your firstname!', whitespace: true }],
          })(<Input  name="firstname" />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Nom:
            </span>
          }
        >
          {getFieldDecorator("Nom", {
            initialValue:this.state.student.student.last_name,
            rules: [{ required: true, message: 'Please input your lastname!', whitespace: true }],
          })(<Input name="lastname" />)}
        </Form.Item>

        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            initialValue:this.state.student.student.phone,
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input name="phone" addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>

        
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Aplliquer les modifications
          </Button>
        </Form.Item>
      </Form>
      ) : <Spin className="center container" /> } 



      </div>
    );
  }
}

const UpdateProfileForm = Form.create({ name: 'register' })(RegistrationForm);

export default UpdateProfileForm;