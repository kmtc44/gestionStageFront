import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Spin, Modal } from "antd";
import { Link } from "react-router-dom";
import "../../assets/css/login.css";
import AddStudents from "./AddStudents";
import Maps from '../Maps/Maps'
import NotificationAlert from "react-notification-alert";

import {
  Button,
  Card,
  CardGroup,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Col,
  CardFooter
} from "reactstrap";
import { connect } from 'react-redux'
import { baseSite } from '../../config'
import UpdateEnterprise from "./UpdateEnterprise";

const { confirm } = Modal;

function Enterprise(props) {
  const [enterprise, setEnterprise] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateVisible, setVisible] = useState(false)
  const notificationAlert = useRef(null)

  function showConfirmDelete(e) {
    const info = e.target.value.split(",");
    const id_enterprise = info[0];
    const id_student = info[1];
    const name = info[2] + " " + info[3];

    confirm({
      title: "Voulez vous vraiment enlever cet eleve de cette entreprise ?",
      content: `nom : ${name}`,
      onOk() {
        const user = JSON.parse(localStorage.getItem("user"));
        axios.defaults.headers = {
          "Content-Type": "Application/json",
          Authorization: `Token ${user.token}`
        };
        axios
          .put(`${baseSite}/internship/enterprise/${id_enterprise}/`, {
            student: id_student
          })
          .then(res => {
            console.log(res.data);
            props.history.push('/dashboard')
            props.history.push(`/dashboard/enterprise/detail/${id_enterprise}`)
          })
          .catch(err => console.log(err));
      },
      onCancel() { }
    });
  }

  function showConfirmAdd(e) {
    const info = e.target.value.split(",");
    const id_enterprise = info[0];
    const name = info[1];

    confirm({
      title:
        "Voulez vous vraiment ajouter cette entreprise a la liste des partenaires ?",
      content: `nom de l'entreprise: ${name}`,
      onOk() {
        const user = JSON.parse(localStorage.getItem("user"));
        axios.defaults.headers = {
          "Content-Type": "Application/json",
          Authorization: `Token ${user.token}`
        };
        axios
          .put(`${baseSite}/internship/enterprise/${id_enterprise}/`, {
            is_partner: true
          })
          .then(res => {
            console.log(res.data);
            props.history.push('/dashboard')
            props.history.push(`/dashboard/enterprise/detail/${id_enterprise}`)
          })
          .catch(err => console.log(err));
      },
      onCancel() { }
    });
  }
  function showConfirmSupp(e) {
    const info = e.target.value.split(",");
    const id_enterprise = info[0];
    const name = info[1];

    confirm({
      title:
        "Voulez vous vraiment supprimer cette entreprise  ?",
      content: `Nom de l'entreprise: ${name}`,
      onOk() {
        axios.defaults.headers = {
          "Content-Type": "Application/json",
          Authorization: `Token ${props.token}`
        };
        axios
          .put(`${baseSite}/internship/enterprise/${id_enterprise}/`, {
            is_deleted: true
          })
          .then(res => {
            console.log(res.data);
            notify(
              "tc",
              `L'enterprise ${res.data.name} est supprimer avec succes`,
              "success"
            );
            setTimeout(() => {
              props.history.push('/dashboard')
            }, 2000)
          })
          .catch(err => console.log(err));
      },
      onCancel() { }
    });
  }

  const showModalUpdate = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }

  const notify = (place, message, type) => {
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

    notificationAlert.current.notificationAlert(options);
  }

  const enterpriseId = path => path.substring(29);

  useEffect(() => {
    const fetchEnterprise = async () => {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${props.token}`
      };
      if (props.status === 'student') {
        axios.get(`${baseSite}/students/${props.statusId}`)
          .then(res => {
            axios.get(`${baseSite}/internship/enterprise/${res.data.enterprise.id}`)
              .then(re => {
                setEnterprise(re.data);
                console.log(re.data);
                setLoading(false);
                localStorage.setItem(re.data.id, 'vue')
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      }
      else {
        const res = await axios(
          `${baseSite}/internship/enterprise/${enterpriseId(
            props.location.pathname
          )}`)
        setEnterprise(res.data);
        setLoading(false);
        localStorage.setItem(res.data.id, 'vue')
      }

    };
    fetchEnterprise();
  }, [props.location.pathname, props.status, props.statusId, props.token]);

  return loading ? (
    <Spin className="center container-fluid " />
  ) : (
      <div>
        <NotificationAlert ref={notificationAlert} />
        <Col className="mx-auto" lg="9" md="9">
          <Card className="card-user">
            <div className="image">
              {enterprise.logo ? (
                <img alt="..." src={enterprise.logo} />
              ) : (
                  <img
                    alt="..."
                    src={require("../../assets/img/enterprise1.png")}
                  />
                )}
            </div>
            <CardBody>
              <div className="author">
                <img
                  alt="..."
                  className="avatar border-gray"
                  src={require("../../assets/img/enterprise.png")}
                />
                <h3>{enterprise.name}</h3>
                <h4>
                  L'entreprise {enterprise.name}{" "}
                  {enterprise.is_partner ? "est" : "n'est pas"} un partenaire de
                  l'EPT
              </h4>
              </div>
              <p className="text-center">
                L'entreprise {enterprise.name}
                evolue dans le domaine de {enterprise.field}"
            </p>
              <div className="container">
                <div className="row">
                  <Col md={6}>
                    <p>
                      <span>DG</span>: <span style={{ fontSize: "bold" }}> {enterprise.leader_name}</span>
                    </p>
                    <p>
                      <i className="now-ui-icons ui-1_email-85" /> :{" "}
                      <a href={`mailto:${enterprise.email}`}>{enterprise.email}</a>
                    </p>
                    <p>
                      <i className="now-ui-icons tech_mobile" /> : {enterprise.phone}
                    </p>
                    <p>
                      <i className="now-ui-icons location_pin" /> :{" "}
                      {enterprise.address}
                    </p>
                    <p>
                      <i className="now-ui-icons business_globe" /> :{" "}
                      <a
                        href={enterprise.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {enterprise.website}
                      </a>
                    </p>
                    {
                      enterprise.is_partner ? (
                        <>
                          {
                            props.status === 'teacher' ? (
                              <AddStudents enterpriseId={enterprise.id} />
                            ) : ('')
                          }
                        </>
                      ) : ('')
                    }
                  </Col>
                </div>
              </div>
            </CardBody>
            {
              props.is_responsible ? (
                <CardFooter>
                  <Button className="btn btn-primary" onClick={showModalUpdate}>
                    Mettre a jour
                  </Button>
                  <Modal
                    visible={updateVisible}
                    title="Mettre a jour Entreprise"
                    onCancel={handleCancel}
                    footer={''}
                  >
                    <UpdateEnterprise taille={12} enterpriseId={enterprise.id} />
                  </Modal>
                </CardFooter>
              ) : ('')
            }

          </Card>
        </Col>
        {enterprise.is_partner ? (
          <div className="container ">

            <h3 className="text-center">
              {" "}
              {enterprise.students[0]
                ? " Listes des encadreurs dans cette entreprise "
                : ""}
            </h3>
            <Row>
              <CardGroup className="mx-auto cardHolder" >
                {enterprise.framers.map(framer => {
                  return (
                    <Col md="4" lg="3" sm="9" xs="9">
                      {/* <Link to={`/dashboard/student/detail/${framer.id}`}> */}
                      <Card style={{ color: 'black' }} key={framer.id}>
                        {framer.image ? (
                          <CardImg
                            className="img-student-enterprise"
                            top
                            src={framer.image}
                            alt="Card image cap"
                          />
                        ) : (
                            <CardImg
                              className="img-student-enterprise"
                              top
                              src={require("../../assets/img/student.png")}
                              alt="Card image cap"
                            />
                          )}
                        <CardBody>
                          <CardTitle style={{ fontSize: "18px" }}>
                            {framer.first_name} {framer.last_name}
                          </CardTitle>

                          <CardText>
                            <div className="text-left">
                              {/* <p>Email : {framer.user.email} </p>
                                <p>Numero : {framer.phone} </p> */}
                              <p> <i className="now-ui-icons tech_mobile" /> : {framer.phone}</p>
                              <p>  <i className="now-ui-icons ui-1_email-85" /> : {framer.user.email}</p>
                            </div>
                          </CardText>
                        </CardBody>
                      </Card>
                      {/* </Link> */}
                    </Col>
                  );
                })}
              </CardGroup>
            </Row>

            <h3 className="text-center">
              {" "}
              {enterprise.students[0]
                ? " Listes des eleves dans cette entreprise "
                : ""}
            </h3>
            <Row>
              <CardGroup className="mx-auto cardHolder" >
                {enterprise.students.map(student => {
                  return (
                    <Col md="4" lg="3" sm="9" xs="9">
                      <Link to={`/dashboard/student/detail/${student.id}`}>
                        <Card style={{ color: 'black' }} key={student.id}>
                          {student.image ? (
                            <CardImg
                              className="img-student-enterprise"
                              top
                              src={student.image}
                              alt="Card image cap"
                            />
                          ) : (
                              <CardImg
                                className="img-student-enterprise"
                                top
                                src={require("../../assets/img/student.png")}
                                alt="Card image cap"
                              />
                            )}
                          <CardBody>
                            <CardTitle style={{ fontSize: "18px" }}>
                              {student.first_name} {student.last_name}
                            </CardTitle>
                            <CardText>
                              <div className="text-left">
                                <p>Departement : {student.department.name} </p>
                                <p>Classe : {student.classroom.name} </p>
                                <p> <i className="now-ui-icons tech_mobile" /> : {student.phone}</p>
                                <p>  <i className="now-ui-icons ui-1_email-85" /> : {student.user.email}</p>
                              </div>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                      {
                        props.status === 'teacher' ? (
                          <Button
                            value={[
                              enterprise.id,
                              student.id,
                              student.first_name,
                              student.last_name
                            ]}
                            className="btn btn-danger"
                            onClick={showConfirmDelete}
                          >
                            Retirer
                        </Button>
                        ) : ('')
                      }
                    </Col>
                  );
                })}
              </CardGroup>
            </Row>
            <hr />
            {enterprise.projects.length ? (
              <div className="container mt-5 ml-4 p-5 center">
                <h2>Liste des projects </h2>
                <Row className="cardProHolder">
                  {enterprise.projects.map(project => {
                    return (
                      <Col key={project.id} sm="6" lg="3" md="4" xs="12">
                        <Link to={`/dashboard/project/detail/${project.id}`}>
                          <Card body style={{ color: 'black' }}>
                            <CardTitle
                              style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                height: 70,

                              }}
                            >
                              {project.name}
                            </CardTitle>
                            <CardText>
                              {project.description.substring(0, 50)}...
                            </CardText>
                          </Card>
                        </Link>
                      </Col>
                    );
                  })}
                </Row>

              </div>
            ) : (
                ""
              )}
            <h3 className="text-center" > Location de l'entreprise {enterprise.name}</h3>
            <Maps enterprise={enterprise} />
          </div>
        ) : (
            <div className="container text-center">
              {
                props.status === 'teacher' && props.is_responsible ? (
                  <Button
                    value={[enterprise.id, enterprise.name]}
                    className="btn btn-primary"
                    onClick={showConfirmAdd}
                  >
                    {" "}
                    Ajouter comme partenaire{" "}
                  </Button>
                ) : ('')
              }
            </div>
          )}
        {
          props.status === 'teacher' && props.is_responsible ? (
            <div className="container text-center">
              <Button
                value={[enterprise.id, enterprise.name]}
                className="btn btn-danger"
                onClick={showConfirmSupp}
              >
                {" "}
                Supprimer cette enterprise{" "}
              </Button>
            </div>
          ) : ('')
        }
      </div>
    );
}

const mapStateToProps = state => {
  return {
    status: state.status,
    statusId: state.statusId,
    token: state.token,
    is_responsible: state.is_responsible
  }
}

export default connect(mapStateToProps)(Enterprise);
