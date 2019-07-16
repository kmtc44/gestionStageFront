import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import { Card, CardTitle, CardText, Row, Col } from "reactstrap";

const baseSite = "http://localhost:8000";
function Project(props) {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "Application/json",
        Authorization: `Token ${user.token}`
      };
      const res = await axios(
        `${baseSite}/project/${props.match.params.projectId}`
      );
      setProject(res.data);
      setLoading(false);
    };

    fetchProject();
  }, [props.match.params.projectId]);

  return loading ? (
    <Spin className="center container " />
  ) : (
    <div className="content mt-3 pl-3 ">
      <Row>
        <Col className="project-center">
          <Card body>
            <CardTitle
              className="text-center"
              style={{
                fontSize: 20,
                fontWeight: "bold",
                height: 50
              }}
            >
              {project.name}
            </CardTitle>
            <CardText>
              <h6 className="text-left"> Description </h6>{" "}
              <p>{project.description} </p>
              <h6 className="text-left"> Objectif </h6> <p>{project.aim} </p>
              <Row>
                <Col lg="6" md="6">
                  <Card>
                    <CardTitle className="text-center">
                      {" "}
                      <h4>Liste des eleves dans ce projet</h4>
                    </CardTitle>
                    <CardText className="mx-auto px-auto">
                      {project.students.map(student => {
                        return (
                          <p style={{ fontSize: "18px" }}>
                            {" "}
                            {student.first_name} {student.last_name}{" "}
                          </p>
                        );
                      })}
                    </CardText>
                  </Card>
                </Col>
                <Col lg="6" md="6">
                  <Card>
                    <CardTitle>
                      <h4 className="text-center"> L'encadreur de ce projet</h4>{" "}
                    </CardTitle>
                    <CardText>
                      <p style={{ fontSize: "18px" }}>
                        {" "}
                        {project.framer.first_name} {project.framer.last_name}{" "}
                      </p>
                      <hr />
                      <h4 className="text-center">
                        {" "}
                        L'entreprise de realisation du projet
                      </h4>{" "}
                      <p style={{ fontSize: "18px" }}>
                        {" "}
                        {project.framer.enterprise.name}{" "}
                      </p>
                    </CardText>
                  </Card>
                </Col>
              </Row>
            </CardText>
          </Card>
        </Col>
        ;
      </Row>
    </div>
  );
}

export default Project;
