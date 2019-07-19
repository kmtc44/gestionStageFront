import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  UncontrolledTooltip,
  CardFooter,
  CardHeader,
  CardBody,
  CustomInput,
  Table
} from "reactstrap";
import { connect } from 'react-redux';

const baseSite = "http://localhost:8000";
function Project(props) {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTask, setLoadingTask] = useState(false);
  const [tasks, setTask] = useState([])

  const handleTaskStateChange = e => {
    const info = e.target.value.split(',')
    const state = info[1]
    const taskId = info[0]

    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers = {
      "Content-Type": "Application/json",
      Authorization: `Token ${user.token}`
    };
    setLoadingTask(true)
    axios.put(`${baseSite}/task/${taskId}/`, {
      state
    })
      .then(res => {
        console.log(res.data)
        axios.get(`${baseSite}/task/`)
          .then(res1 => {
            setTask(res1.data.filter(task => task.project === project.id))
            setLoadingTask(false)
          })
      })

  };

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
      setTask(res.data.tasks)
      setLoading(false);
    };

    fetchProject();
    console.log(props.status)
  }, [props.match.params.projectId, props.status]);

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
                <h4 className="text-left"> Description </h4>{" "}
                <span>{project.description} </span>
                <h4 className="text-left"> Objectif </h4>
                <span>{project.aim} </span>
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
        <hr />

        <Col className="mx-auto" xs={12} md={9}>
          <Card className="card-tasks">
            <CardHeader>
              <h5 className="card-category">{project.name}</h5>
              <CardTitle tag="h4">Les taches de ce projet</CardTitle>
            </CardHeader>
            <CardBody>
              {
                loadingTask ? (
                  <Spin className="center container " />
                ) : (
                    <div className="table-full-width table-responsive">
                      <Table>
                        <tbody>
                          {tasks.map(task => {
                            return (
                              <tr>
                                <td>
                                  <CustomInput
                                    type="radio"
                                    name={`radioTask${task.id}`}
                                    label="To Do"
                                    id={`RadioTodo${task.id}`}
                                    value={[task.id, 'To Do']}
                                    onChange={handleTaskStateChange}
                                    checked={task.state === 'To Do'}
                                  />
                                  <CustomInput
                                    type="radio"
                                    name={`radioTask${task.id}`}
                                    label="Doing"
                                    id={`RadioDoing${task.id}`}
                                    value={[task.id, 'Doing']}
                                    onChange={handleTaskStateChange}
                                    checked={task.state === 'Doing'}
                                  />
                                  <CustomInput
                                    type="radio"
                                    name={`radioTask${task.id}`}
                                    label="Done"
                                    id={`RadioDone${task.id}`}
                                    value={[task.id, 'Done']}
                                    onChange={handleTaskStateChange}
                                    checked={task.state === 'Done'}
                                  />{
                                    props.status === 'framer' ? (
                                      <>
                                        <CustomInput
                                          type="radio"
                                          name={`radioTask${task.id}`}
                                          label="Reviewing"
                                          id={`RadioReview${task.id}`}
                                          value={[task.id, 'Reviewing']}
                                          onChange={handleTaskStateChange}
                                          checked={task.state === 'Reviewing'}
                                        />
                                        <CustomInput
                                          type="radio"
                                          name={`radioTask${task.id}`}
                                          label="Finish"
                                          id={`RadioFinish${task.id}`}
                                          value={[task.id, 'Finish']}
                                          onChange={handleTaskStateChange}
                                          checked={task.state === 'Finish'}
                                        />
                                      </>
                                    ) : (
                                        <>
                                          <CustomInput
                                            type="radio"
                                            name={`radioTask${task.id}`}
                                            label="Reviewing"
                                            disabled
                                            checked={task.state === 'Reviewing'}
                                          />
                                          <CustomInput
                                            type="radio"
                                            name=""
                                            label="Finish"
                                            disabled
                                            checked={task.state === 'Finish'}
                                          />
                                        </>
                                      )
                                  }

                                </td>
                                <td className="text-left">{task.title}
                                  <br />
                                  {task.students.map(student => {
                                    return (
                                      <span>
                                        {student.first_name[0].toUpperCase()}.{student.last_name[0].toUpperCase()} <br />
                                      </span>
                                    )
                                  })}

                                </td>
                                <td className="td-actions text-right">
                                  <Button
                                    className="btn-round btn-icon btn-icon-mini btn-neutral"
                                    color="info"
                                    id="tooltip731609871"
                                    type="button"
                                  >
                                    <i className="now-ui-icons ui-2_settings-90" />
                                  </Button>
                                  <UncontrolledTooltip
                                    delay={0}
                                    target="tooltip731609871"
                                  >
                                    Edit Task
                          </UncontrolledTooltip>
                                  <Button
                                    className="btn-round btn-icon btn-icon-mini btn-neutral"
                                    color="danger"
                                    id="tooltip923217206"
                                    type="button"
                                  >
                                    <i className="now-ui-icons ui-1_simple-remove" />
                                  </Button>
                                  <UncontrolledTooltip
                                    delay={0}
                                    target="tooltip923217206"
                                  >
                                    Remove
                          </UncontrolledTooltip>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>

                  )
              }
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className="now-ui-icons loader_refresh spin" /> Updated 3
                minutes ago
            </div>
            </CardFooter>
          </Card>
        </Col>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    status: state.status
  }
}

export default connect(mapStateToProps)(Project);
