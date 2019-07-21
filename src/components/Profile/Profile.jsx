import React from "react";
import axios from "axios";
import { connect } from 'react-redux'
import moment from "moment";

import student2 from "../../assets/img/student2.png";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  UncontrolledCollapse,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { Spin } from "antd";

import ModalElement from './ModalElement';


class User extends React.Component {

  state = {
    userData: {},
    loading: true
  }

  componentDidMount() {
    const { statusId, status, token } = this.props
    console.log(status)

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    if (this.props.match.params.studentId) {
      axios.get(`http://127.0.0.1:8000/students/${this.props.match.params.studentId}`)
        .then(res => {
          this.setState({
            userData: res.data
          });
          this.setState({ loading: false })
        })
        .catch(err => console.log(err))
    } else {
      switch (status) {
        case 'student':
          axios.get(`http://127.0.0.1:8000/students/${statusId}`)
            .then(res => {
              this.setState({
                userData: res.data
              });
              this.setState({ loading: false })
            })
            .catch(err => console.log(err))
          break;
        case 'teacher':
          axios.get(`http://127.0.0.1:8000/teachers/${statusId}`)
            .then(res => {
              this.setState({
                userData: res.data
              });
              this.setState({ loading: false })
            })
            .catch(err => console.log(err))
          break;
        case 'framer':
          axios.get(`http://127.0.0.1:8000/framers/${statusId}`)
            .then(res => {
              this.setState({
                userData: res.data
              });
              this.setState({ loading: false })
            })
            .catch(err => console.log(err))
          break;
        default:
          console.log('pas normale')
      }
    }
  }
  // componentWillReceiveProps(newProps) {
  //   const { statusId, status, token } = newProps
  //   console.log(status)

  //   axios.defaults.headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Token ${token}`
  //   }
  //   switch (status) {
  //     case 'student':
  //       axios.get(`http://127.0.0.1:8000/students/${statusId}`)
  //         .then(res => {
  //           this.setState({
  //             userData: res.data
  //           });
  //           this.setState({ loading: false })
  //         })
  //         .catch(err => console.log(err))
  //       break;
  //     case 'teacher':
  //       axios.get(`http://127.0.0.1:8000/teachers/${statusId}`)
  //         .then(res => {
  //           this.setState({
  //             userData: res.data
  //           });
  //           this.setState({ loading: false })
  //         })
  //         .catch(err => console.log(err))
  //       break;
  //     case 'framer':
  //       axios.get(`http://127.0.0.1:8000/framers/${statusId}`)
  //         .then(res => {
  //           this.setState({
  //             userData: res.data
  //           });
  //           this.setState({ loading: false })
  //         })
  //         .catch(err => console.log(err))
  //       break;
  //     default:
  //       console.log('pas normale')
  //   }
  // }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <Spin className="center container" />
        ) : (
            <div className="container">
              <Row>
                <Card>
                  <Col md="6" className="mx-auto">
                    <div className="img-container container" >
                      {
                        this.state.userData.image
                          ? (
                            <img className="img-thumbnail img-profile" src={this.state.userData.image} alt={""} />
                          )
                          : (
                            <img className="img-thumbnail img-profile" src={student2} alt={""} />
                          )
                      }
                    </div>
                  </Col>
                  <Col md="10" className="mx-auto">
                    <Card>
                      <CardHeader>
                        <Row>
                          <Col md="12">
                            {
                              !this.props.match.params.studentId ? (
                                <ModalElement userData={this.state.userData} />
                              ) : ('')
                            }


                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <ListGroup className="list-group-flush" style={{ position: 'center'}}>
                          <Row>

                            <Col md="6">
                              <ListGroupItem ><u><strong>Prénom :</strong></u>&nbsp;  &nbsp; {this.state.userData.first_name}</ListGroupItem>

                              <ListGroupItem ><u><strong>Nom :</strong></u>&nbsp; &nbsp; {this.state.userData.last_name}</ListGroupItem>

                              <ListGroupItem ><u><strong>email :</strong></u>&nbsp; &nbsp; {this.state.userData.user.email}</ListGroupItem>

                              <ListGroupItem ><u><strong>Téléphone :</strong></u>&nbsp; &nbsp; {this.state.userData.phone}</ListGroupItem>
                              {
                                (this.props.status === 'student' && this.state.userData.enterprise) || this.props.match.params.studentId ? (
                                  <ListGroupItem ><u><strong>Classe :</strong></u>&nbsp;  &nbsp; {this.state.userData.classroom.name}</ListGroupItem>

                                ) : ('')
                              }

                              {
                                this.props.status === 'framer' ? (
                                  <ListGroupItem ><u><strong>Entreprise :</strong></u>&nbsp; &nbsp; {this.state.userData.enterprise.name}</ListGroupItem>
                                ) : ('')
                              }


                            </Col>

                            {
                              this.props.status === 'student' || this.props.match.params.studentId ? (
                                <Col md="6">

                                  <ListGroupItem ><u><strong>Departement :</strong></u>&nbsp; &nbsp; {this.state.userData.department.name}</ListGroupItem>
                                  {
                                    this.state.userData.enterprise ? (
                                      <ListGroupItem ><u><strong>Enterprise :</strong></u>&nbsp; &nbsp; {this.state.userData.enterprise.name}</ListGroupItem>
                                    ) : (<ListGroupItem ><u><strong>Classe :</strong></u>&nbsp;  &nbsp; {this.state.userData.classroom.name}</ListGroupItem>)
                                  }

                                  <ListGroupItem ><u><strong>Promotion :</strong></u>&nbsp; &nbsp; {this.state.userData.promotion.name}</ListGroupItem>

                                  <ListGroupItem ><u><strong>Date de naissance :</strong></u>&nbsp; &nbsp; {moment(this.state.userData.birthday).format("DD-MM-YYYY")}</ListGroupItem>

                                </Col>
                              ) : ('')
                            }

                          </Row>
                          {this.props.status === 'student' ? (
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
                                              <ListGroupItem ><strong>Genre:</strong> {this.state.userData.gender}</ListGroupItem>

                                              <ListGroupItem ><strong>Etat civil:</strong> {this.state.userData.socialStatus}</ListGroupItem>

                                              <ListGroupItem ><strong>Adresse:</strong> {this.state.userData.address}</ListGroupItem>
                                            </Col>
                                            <Col md="6">
                                              <ListGroupItem style={{ marginLeft: '0.5%' }}><strong>Competences:</strong>
                                                <ul> {this.state.userData.skills.map(skill => {
                                                  return (
                                                    <li key={skill.id} > {skill.name} &nbsp; &nbsp;</li>)
                                                })
                                                } </ul>
                                              </ListGroupItem>
                                            </Col>
                                            <Col md="6">
                                              <ListGroupItem ><strong>Projets realises:</strong>
                                                <ul> {this.state.userData.projects.map(project => {
                                                  return (
                                                    <li key={project.id} > {project.name} &nbsp; &nbsp;</li>)
                                                })
                                                } </ul>
                                              </ListGroupItem>
                                            </Col>
                                          </Row>
                                        </ListGroup>
                                      </CardBody>
                                    </Card>
                                  </UncontrolledCollapse>
                                </div>
                              </Col>
                            </Row>) : ('')}
                        </ListGroup>
                      </CardBody>
                    </Card>
                  </Col>
                </Card>
              </Row>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.status,
    statusId: state.statusId,
    token: state.token
  }
}

export default connect(mapStateToProps)(User);
