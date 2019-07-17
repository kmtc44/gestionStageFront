import React from "react";
import axios from "axios";
// reactstrap components

import student2 from "../../assets/img/student2.png";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  UncontrolledCollapse,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { Spin,  Icon } from "antd";
// core components
import ModalElement from './ModalElement';


class User extends React.Component { 

  state = {
    student: {},
    loading: true
  }

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


  render() {
    return (
    
       <div>
       {
      this.state.loading === false ? (
        <div className="container">
          <Row>
          <Col md={12}>
          {this.state.student.student.image ? ( <img className="avatar center" style={{ borderRadius: '20%', marginLeft: '25%',height:'400px', width: '400px' }} src={this.state.student.student.image} />):
          ( <img className="avatar center" style={{ borderRadius: '20%',height:'400px', marginLeft: '25%', width: '400px' }} src={student2} />)}
         
          </Col>
            <Col md={12}>
              <Card>
                <CardHeader>
                  <Row>
                     <Col md="12">
                        <ModalElement requestType="Put" pk={this.state.student.student.id}/>
                     </Col>
                    </Row>
                </CardHeader>

                <CardBody>
                   <ListGroup className="list-group-flush" style={{ position: 'center' }}>
                    <Row>
                      <Col className="px-1" md="6">
                          <ListGroupItem ><p><u> <strong>Utilisateur :</strong></u>&nbsp; &nbsp;{this.state.student.student.user.username}</p> </ListGroupItem>
                      </Col>
                      <Col className="pl-1" md="6">
                          <ListGroupItem ><u><strong>Prénom :</strong></u>&nbsp;  &nbsp; {this.state.student.student.first_name}</ListGroupItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1 " md="6">
                        <ListGroupItem ><u><strong>Nom :</strong></u>&nbsp; &nbsp; {this.state.student.student.last_name}</ListGroupItem>
                      </Col>
                      <Col className="pl-1" md="6">
                        <ListGroupItem ><u><strong>email :</strong></u>&nbsp; &nbsp; {this.state.student.student.user.email}</ListGroupItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <ListGroupItem ><u><strong>Téléphone :</strong></u>&nbsp; &nbsp; {this.state.student.student.phone}</ListGroupItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <div>
                          <Button className='btn btn-info btn-block' id="toggler" style={{ marginBottom: '1rem' }}>
                            Voir le C.V.
                          </Button>
                          <UncontrolledCollapse toggler="#toggler">
                          <Card>
                            <CardBody>
                              <ListGroup className="list-group-flush" style={{ position: 'center' }}>
                                <Row>

                                    <Col className="px-1" md="6">
                                        <ListGroupItem ><strong>Genre:</strong> {this.state.student.student.gender}</ListGroupItem>
                                    </Col>

                                    <Col className="px-1" md="6">
                                        <ListGroupItem ><strong>Etat civil:</strong> {this.state.student.student.socialStatus}</ListGroupItem>
                                    </Col>

                                    <Col className="px-1" md="6">
                                        <ListGroupItem ><strong>Adresse:</strong> {this.state.student.student.address}</ListGroupItem>
                                    </Col>

                                    <Col className="px-1" md="6">
                                        <ListGroupItem style={{ marginLeft: '0.5%' }}><strong>A reçu les formations suivantes:</strong> <ul> {this.state.student.student.skills.map(skill =>
                                          {return (
                                            <li key={skill.id} style={{ display: "inline"}}> {skill.name} &nbsp; &nbsp;</li>)})} </ul> </ListGroupItem>
                                    </Col>
          
                                    
                                  </Row>
                              </ListGroup>
                            </CardBody>
                          </Card>
                        </UncontrolledCollapse>
                      </div>
                      </Col>
                    </Row>

                   </ListGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
         ) : <Spin className="center container" /> } 



      </div>
    
             
    );
  }
}

export default User;
