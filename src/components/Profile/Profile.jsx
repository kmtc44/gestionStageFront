import React from "react";
import axios from "axios";
// reactstrap components

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
import { Spin } from "antd";
// core components

import UpdateProfileForm from './UpdateProfile';
// import PanelHeader from "../PanelHeader/PanelHeader.jsx";


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
          <img className="avatar center" style={{ borderRadius: '50%', marginLeft: '25%' }} src={require("../../assets/img/student2.png")} />
          </Col>
            <Col md={12}>
              <Card>
                <CardHeader>
                <Button className='btn btn-info btn-block' id="toggler" style={{ marginBottom: '1rem' }}>
                           Edit Profile
                          </Button>
                  
                </CardHeader>

                <CardBody>
                   <ListGroup className="list-group-flush" style={{ position: 'center' }}>
                    <Row>
                      <Col className="px-1" md="6">
                          <ListGroupItem ><h6><u>Utilisateur:</u></h6> {this.state.student.student.user.username}</ListGroupItem>
                      </Col>
                      <Col className="pl-1" md="6">
                          <ListGroupItem ><h6><u>Prénom: </u></h6>{this.state.student.student.first_name}</ListGroupItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1 " md="6">
                        <ListGroupItem ><h6><u>Nom: </u></h6> {this.state.student.student.last_name}</ListGroupItem>
                      </Col>
                      <Col className="pl-1" md="6">
                        <ListGroupItem ><h6><u>email: </u></h6> {this.state.student.student.user.email}</ListGroupItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <ListGroupItem ><h6><u>Téléphone: </u></h6> {this.state.student.student.phone}</ListGroupItem>
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
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                              similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                              dignissimos esse fuga! Minus, alias.
                            </CardBody>
                          </Card>
                        </UncontrolledCollapse>
                      </div>
                      </Col>
                    </Row>
                   </ListGroup>
                </CardBody>

                <Row>
                     <Col md="12">
                     <UpdateProfileForm requestType="put" userID={this.state.student.student.id} />
                     </Col>
                </Row>

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
