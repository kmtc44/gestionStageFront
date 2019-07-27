import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Spin, Avatar, Modal, } from "antd";
import {
  Card,
  Button,
  CardTitle,
  Row,
  Col,
  UncontrolledTooltip,
  CardFooter,
  CardHeader,
  CardBody,
  CustomInput,
  Table
} from "reactstrap";
import Task from '../Task/Task'
import FormTask from "../Task/FormTask"
import { connect } from 'react-redux';
import NotificationAlert from "react-notification-alert";

const baseSite = "http://localhost:8000";
function Project(props) {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTask, setLoadingTask] = useState(false);
  const [tasks, setTask] = useState([])
  const [detailVisible, setVisible] = useState(false)
  const [createTaskVisible, setCreateTaskVisible] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const notificationAlert = useRef(null)


  const showModal = (e) => {
    setSelectedTaskId(e.target.getAttribute('value') || e.target.getAttribute('data'))
    if (selectedTaskId) {
      setVisible(true)
    }
  };
  const showModalCreate = () => {
    setCreateTaskVisible(true)
  }
  const handleCancel = () => {
    setVisible(false);
  };

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
      state,
      user: props.userId
    })
      .then(res => {
        console.log(res.data)
        axios.get(`${baseSite}/task/`)
          .then(res1 => {
            setTask(res1.data.filter(task => task.project === project.id))
            notify(
              "tc",
              `L'etat de la tache ${res.data.title} est maintenant en ${res.data.state}`,
              "success"
            );
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
  }, [props.match.params.projectId, props.status]);

  return loading ? (
    <Spin className="center container " />
  ) : (
      <div className="content mt-3 pl-3 ">

        <NotificationAlert ref={notificationAlert} />
        <Row>
          <Col className="project-center mx-auto" xs={12} md={9}>
            <Card body>
              <CardTitle
                className="text-center"
                style={{
                  fontSize: 20,
                  fontWeight: "bold",

                }}
              >
                {project.name}
              </CardTitle>
              <CardBody>
                <Row>
                  <Col lg="6" md="6">
                    <h4 style={{
                      fontSize: 18,
                      fontWeight: "bold",

                    }} className="text-left"> Description </h4>{" "}
                    <span>{project.description} </span>
                    <h4 style={{
                      fontSize: 18,
                      fontWeight: "bold",

                    }} className="text-left"> Objectif </h4>
                    <span>{project.aim} </span>
                    <h4 style={{
                      fontSize: 18,
                      fontWeight: "bold",

                    }} className="text-left"> L'encadreur de ce projet</h4>{" "}

                    <p style={{ fontSize: "18px" }}>
                      {" "}
                      {project.framer.first_name} {project.framer.last_name}{" "}
                    </p>


                  </Col>
                  <Col lg="6" md="6">
                    <h4 style={{
                      fontSize: 18,
                      fontWeight: "bold",

                    }}>Liste des eleves dans ce projet</h4>


                    {project.students.map(student => {
                      return (
                        <p key={student.id} style={{ fontSize: "18px" }}>
                          {" "}
                          {student.first_name} {student.last_name}{" "}
                        </p>
                      );
                    })}

                    <h4 style={{
                      fontSize: 18,
                      fontWeight: "bold",

                    }} className="text-left">
                      {" "}
                      L'entreprise de realisation du projet
                      </h4>{" "}
                    <p style={{ fontSize: "18px" }}>
                      {" "}
                      {project.framer.enterprise.name}{" "}
                    </p>

                  </Col>
                </Row>
              </CardBody >
              <CardFooter>
                <Button className="btn btn-primary" onClick={showModalCreate}>
                  Nouvelle Tache
                </Button>
                <Modal
                  visible={createTaskVisible}
                  title="Creer une tache"
                  onCancel={handleCancel}
                  footer={''}
                >
                  <FormTask projectId={project.id} />
                </Modal>
              </CardFooter>
            </Card >
          </Col >
          ;
      </Row >
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
                              <tr key={task.id}>
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
                                            id={`RadioReviewing${task.id}`}
                                            disabled
                                            checked={task.state === 'Reviewing'}
                                          />
                                          <CustomInput
                                            type="radio"
                                            name=""
                                            id={`RadioReviewing${task.id}`}
                                            label="Finish"
                                            disabled
                                            checked={task.state === 'Finish'}
                                          />
                                        </>
                                      )
                                  }

                                </td>
                                <td value={task.id} data={task.id} className="text-left" onClick={showModal}>{task.title}
                                  <hr />
                                  <p className="mr-5">
                                    {task.students.map(student => {
                                      return (
                                        <span key={student.id}>
                                          {
                                            student.image ? (
                                              <span>
                                                <Avatar src={student.image} /> {student.first_name[0].toUpperCase()}.{student.last_name[0].toUpperCase()}
                                              </span>
                                            ) : (
                                                <span>
                                                  <Avatar src={require("../../assets/img/student.png")} /> {student.first_name[0].toUpperCase()}.{student.last_name[0].toUpperCase()}
                                                </span>
                                              )
                                          }
                                        </span>
                                      )
                                    })}
                                  </p>
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
        <Modal
          visible={detailVisible}
          title="Tache detail"
          onCancel={handleCancel}
          footer={''}
        >
          <Task taskId={selectedTaskId} />
        </Modal>
      </div >
    );
}

const mapStateToProps = state => {
  return {
    status: state.status,
    userId: state.userId
  }
}

export default connect(mapStateToProps)(Project);
