import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";

const baseSite = "http://localhost:8000";
function ListProject(props) {
  const [projects, setProject] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
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

    fetchStudent();
  }, []);
  return loading ? (
    <Spin className="center container " />
  ) : (
    <div className="content mt-5 ml-4 p-5 center">
      <Row>
        {projects.map(project => {
          return (
            <Col key={project.id} sm="6" lg="3" md="4" xs="12">
              <Card body>
                <CardTitle
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    height: 50
                  }}
                >
                  {project.name}
                </CardTitle>
                <CardText>{project.description.substring(0, 50)}...</CardText>
                <Link to={`/dashboard/project/detail/${project.id}`}>
                  <Button>
                    Voir plus <i className={"now-ui-icons ui-1_simple-add"} />
                  </Button>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default ListProject;
