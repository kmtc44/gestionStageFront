import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Modal } from "antd";
import { Link } from "react-router-dom";
import "../../assets/css/login.css";
import AddStudents from "./AddStudents";
import Maps from '../Maps/Maps'

import {
  Button,
  Card,
  CardGroup,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";

const baseSite = "http://localhost:8000";

const { confirm } = Modal;

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
      "Voulez vous vraiment ajoter cette entreprise a la liste des partenaires ?",
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
        })
        .catch(err => console.log(err));
    },
    onCancel() { }
  });
}

function Enterprise(props) {
  const [enterprise, setEnterprise] = useState({});
  const [loading, setLoading] = useState(false);


  const enterpriseId = path => path.substring(29);

  useEffect(() => {
    const fetchEnterprise = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`
      };
      const res = await axios(
        `${baseSite}/internship/enterprise/${enterpriseId(
          props.location.pathname
        )}`
      );

      setEnterprise(res.data);
      setLoading(false);
    };
    fetchEnterprise();
  }, [props.location.pathname]);

  return loading ? (
    <Spin className="center container-fluid " />
  ) : (
      <div>
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
                <a href="#ok" onClick={e => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={require("../../assets/img/enterprise.png")}
                  />
                  <h3>{enterprise.name}</h3>
                </a>
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
              </div>
            </CardBody>
          </Card>
        </Col>
        {enterprise.is_partner ? (
          <div className="container ">
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
                    </Col>
                  );
                })}
              </CardGroup>
            </Row>

            <AddStudents enterpriseId={enterprise.id} />
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
            <Maps enterprise={enterprise} />
          </div>
        ) : (
            <div className="container text-center">
              <Button
                value={[enterprise.id, enterprise.name]}
                className="btn btn-primary"
                onClick={showConfirmAdd}
              >
                {" "}
                Ajouter comme partenaire{" "}
              </Button>
            </div>
          )}
      </div>
    );
}

export default Enterprise;
