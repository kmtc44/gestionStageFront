import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardText, Row, Col } from "reactstrap";
import { connect } from 'react-redux';
import Pagination from '../Pagination'
import { baseSite } from '../../config'


function ListProject(props) {
  const [projects, setProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectPerPage] = useState(12);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "Application/json",
        Authorization: `Token ${user.token}`
      };
      if (props.status === 'framer') {
        const res = await axios(`${baseSite}/framers/${props.statusId}`);
        setProject(res.data.projects);
        setLoading(false);
      } else if (props.status === 'student') {
        const res = await axios(`${baseSite}/students/${props.statusId}`);
        setProject(res.data.projects);
        setLoading(false);
      } else if (props.status === 'teacher') {
        const res = await axios(`${baseSite}/project/`);
        setProject(res.data);
        setLoading(false);
      }

    };

    fetchProjects();
  }, [props.status, props.statusId]);
  //Guetting the current projects

  const indexOfLastProject = currentPage * projectPerPage;
  const indexOfFirstProject = indexOfLastProject - projectPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);


  //Changing page with paginate method
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return loading ? (
    <Spin className="center container " />
  ) : (
      <div className="content mt-3 ml-4 p-5 center">
        {
          currentProjects.length ? (
            <Row className="cardProHolder">
              {currentProjects.map(project => {
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
          ) : (
              <div className="text-center">
                <h3 className="text-danger"> Pas encore de projet </h3>
              </div>
            )
        }
        {
          projects.length > projectPerPage ? (

            <Pagination currentPage={currentPage} itemPerPage={projectPerPage}
              totalItems={projects.length}
              paginate={paginate} />
          ) : ("")
        }
      </div>

    );
}

const mapStateToProps = state => {
  return {
    status: state.status,
    statusId: state.statusId,
    enterpriseId: state.enterpriseId
  }
}

export default connect(mapStateToProps)(ListProject);
