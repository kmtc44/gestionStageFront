import React from "react";
import {connect} from "react-redux"; 


import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Icon,
  Spin
} from 'antd';

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from "reactstrap";

import axios from "axios";



class Attachments extends React.Component {

	state = {
		file: null,
		exist : null,
	    fileList: [],
	    fileCv: [],
	    uploading: false  
	}
	
	handleFormSubmit = (e) => {
	    //e.preventDefault();	    
	    const { token } = this.props;
	    axios.defaults.headers = {
	        "Content-Type": "application/json",
	      	Authorization: `Token ${token}`
	    }

	    const { fileList } = this.state;

    	console.log(this.props.studentId)
    	const fData = new FormData()

	    this.setState({
	      uploading: true,
	    });

    	fData.append("rapport", fileList[0])
	    fData.append("student", this.props.studentId)
	    axios.get(`http://127.0.0.1:8000/attachments/`)
	    .then(res => {
	    	this.setState({exist:res.data.filter(attachment => attachment.student === this.props.studentId)[0]})
	    	if (!this.state.exist){
		      axios.post(`http://127.0.0.1:8000/attachments/`, fData)
	            .then(res1 =>  {
	            	this.setState({
	      				uploading: false,
	    			})
	    			console.log(res1) }
	    			)
	            .catch(err => console.log(err));
		    }else {
		      axios.put(`http://127.0.0.1:8000/attachments/${this.state.exist.id}/`, fData)
	            .then(res1 => {
	            	this.setState({
	      				uploading: false,
	    				});
	            	console.log(res1)})
	            .catch(err => console.log(err));
		    }
	    })
	}


handleFormSubmitCv = (e) => {
	    //e.preventDefault();	    
	    const { token } = this.props;
	    axios.defaults.headers = {
	        "Content-Type": "application/json",
	      	Authorization: `Token ${token}`
	    }

	    const { fileCv } = this.state;

    	console.log(this.props.studentId)
    	const fData = new FormData()

	    this.setState({
	      uploading: true,
	    });

    	fData.append("cv", fileCv[0])
	    fData.append("student", this.props.studentId)
	    axios.get(`http://127.0.0.1:8000/attachments/`)
	    .then(res => {
	    	this.setState({exist:res.data.filter(attachment => attachment.student === this.props.studentId)[0]})
	    	if (!this.state.exist){
		      axios.post(`http://127.0.0.1:8000/attachments/`, fData)
	            .then(res1 =>  {
	            	this.setState({
	      				uploading: false,
	    			})
	    			console.log(res1) }
	    			)
	            .catch(err => console.log(err));
		    }else {
		      axios.put(`http://127.0.0.1:8000/attachments/${this.state.exist.id}/`, fData)
	            .then(res1 => {
	            	this.setState({
	      				uploading: false,
	    				});
	            	console.log(res1)})
	            .catch(err => console.log(err));
		    }
	    })
	}



	render() {

	const { uploading, fileList, fileCv } = this.state;

    const props = {
      beforeUpload: file => {
        this.setState({
          fileList: [file]
        });
        console.log(file)
        return false;
      },
      fileList,

      beforeUploadCv: file => {
      	this.setState({
      		fileCv: [file]
      	});
      	return false;
      },
      fileCv,
    };


		return (
			<div className="container">
              <Row>
                <Card>
	                <CardBody>
	                 <Col md="12" className="mx-auto" >							
						<div>
						<Form onSubmit={this.handleFormSubmit}>
						        <Upload beforeUpload={props.beforeUpload}  fileList={props.fileList}>
						          <Button>
						            <Icon type="upload" /> Joindre le rapport
						          </Button>
						        </Upload>
						        <Button
						          type="primary"
						          htmlType="Submit"
						          disabled={fileList.length === 0}
						          loading={uploading}
						          style={{ marginTop: 16 }}>
						          {uploading ? 'Uploading' : 'Sauvegarder'}
						        </Button>
						</Form>
	      				</div>    
				    </Col>

				    <hr />

				    <Col md="12" className="mx-auto" >							
						<div>
						<Form onSubmit={this.handleFormSubmitCv}>
						        <Upload beforeUpload={props.beforeUploadCv}  fileList={props.fileCv}>
						          <Button>
						            <Icon type="upload" /> Joindre le C.V.
						          </Button>
						        </Upload>
						        <Button
						          type="primary"
						          htmlType="Submit"
						          disabled={fileCv.length === 0}
						          loading={uploading}
						          style={{ marginTop: 16 }}>
						          {uploading ? 'Uploading' : 'Sauvegarder'}
						        </Button>
						</Form>
	      				</div>    
				    </Col>
				    </CardBody>
			  	</Card>
              </Row>
            </div>    
		);
	}
}


const mapStateToProps = (state) => {
	return {
		studentId: state.statusId,
		token: state.token
	}
}

export default connect(mapStateToProps) (Attachments);