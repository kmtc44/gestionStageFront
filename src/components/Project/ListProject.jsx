import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardText, Row, Col } from "reactstrap";

const baseSite = "http://localhost:8000";
function ListProject(props) {
  const [projects, setProject] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "Application/json",
        Authorization: `Token ${user.token}`
      };
      const res = await axios(`${baseSite}/project/`);
      setProject(res.data);
      setLoading(false);
    };

    fetchProjects();
  }, []);
  return loading ? (
    <Spin className="center container " />
  ) : (
      <div className="content mt-3 ml-4 p-5 center">
        <Row className="cardProHolder">
          {projects.map(project => {
            return (
              <Col key={project.id} sm="6" lg="3" md="4" xs="12">
                <Link to={`/dashboard/project/detail/${project.id}`}>
                  <Card body style={{ color: 'black' }}>
                    <CardTitle
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        height: 80,
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
    );
}

export default ListProject;
