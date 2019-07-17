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
    student: {},
    loading: true,
    studentId : null
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
          student: res.data,
          studentId : res.data.student.id
        });
        this.setState({loading : false})
      })
  }


normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };



  AddImage = (e) => {
    this.setState({image:e.target.files[0]})
  }

  
   handleFormSubmit = (e) => {
   // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
        const fStudent = new FormData() 
        fStudent.append("first_name", values.firstname)
        fStudent.append("last_name", values.lastname)
        fStudent.append("phone", values.phone)
        fStudent.append("address", values.address)
        fStudent.append("gender", values.gender)
        fStudent.append("socialStatus", values.socialStatus) 
        
        fStudent.append("image", this.state.image)
        axios.put(`http://127.0.0.1:8000/students/${this.state.studentId}/`, fStudent)
          .then(res => console.log('Reussiii',res))
          .catch(error => console.log('ERREURRRR',error));
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

      <Form {...formItemLayout } onSubmit={this.handleFormSubmit} >

        <Form.Item label={<span>Prénom:</span>}>
          {getFieldDecorator("firstname", {
            initialValue:this.state.student.student.first_name,
            rules: [{ required: true, message: 'Please input your firstname!', whitespace: true }],
          })(<Input  name="firstname" />)}
        </Form.Item>

        <Form.Item label={<span>Nom:</span>}>
          {getFieldDecorator("lastname", {
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

        <Form.Item
          label={
            <span>
              Adresse:
            </span>
          }>
          {getFieldDecorator("address", {
            initialValue:this.state.student.student.address,
            rules: [{ required: true, message: 'Please input your address!', whitespace: true }],
          })(<Input  name="address" />)}
        </Form.Item>

        <Form.Item
          label={<span>Genre:</span>}>
          {getFieldDecorator("gender", {
            initialValue:this.state.student.student.gender,
            rules: [{ required: true, message: 'Please input your gender!', whitespace: true }],
          })( <Select
            name="gender"
            style={{ width: '50%' }}>
            <Option value="Masculin">Masculin</Option>
            <Option value="Féminin">Féminin</Option>
        </Select>)}
        </Form.Item>

        <Form.Item
          label={<span>Etat civil:</span>}>
          {getFieldDecorator("socialStatus", {
            initialValue:this.state.student.student.socialStatus,
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

        <Form.Item label="Image de profil">
           <input type="file" onChange={e =>this.AddImage(e)}/>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <ModalSkills></ModalSkills>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button style={{marginTop: "10%"}}  type="primary" htmlType="submit">
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