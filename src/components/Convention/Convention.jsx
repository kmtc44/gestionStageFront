import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Modal } from "antd";
import { connect } from "react-redux";
import "../../assets/css/login.css";
import Chat from './Chat'
import "../../assets/css/chat.css"
import SetDuration from './SetDelay'

import { Card, CardBody, Col, Button } from "reactstrap";

const baseSite = "http://localhost:8000";

function Convention(props) {
  const [convention, setConvention] = useState();
  const [conventionState, setConventionState] = useState('')
  const [loading, setLoading] = useState(true);
  const [visibleSetTime, setVisible] = useState(false);

  const conventioState = (state) => {
    switch (state) {
      case 'R':
        setConventionState('La convention est en cours')
        break
      case 'S':
        setConventionState('La convention est en suspendue')
        break
      case 'E':
        setConventionState('La convention est en expire')
        break
      default:
        break
    }
  }

  const showModal = (e) => {
    console.log(e)
    setVisible(true)
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  useEffect(() => {
    const fetchEnterprise = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`
      };
      let res = null
      if (props.match.params.convId) {
        res = await axios(
          `${baseSite}/internship/convention/${props.match.params.convId}`
        );
        setConvention(res.data);
        conventioState(res.data.state)
        setLoading(false);
      } else if (props.enterpriseId) {
        res = await axios(
          `${baseSite}/internship/convention`
        );
        setConvention(res.data.filter(convention => convention.enterprise.id === props.enterpriseId)[0])
        setLoading(false);
      }
    };
    fetchEnterprise();
  }, [props.match.params.convId, props.enterpriseId]);
  console.log(convention);

  return loading ? (
    <Spin className="center container-fluid " />
  ) : (
      <div>
        {
          convention ? (
            <Col className="mx-auto" lg="9" md="9">
              <Card className="card-user">
                <div className="image">
                  <img alt="..." src={require("../../assets/img/convention.png")} />
                </div>
                <CardBody>
                  <div className="author">
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("../../assets/img/enterprise.png")}
                    />
                    <h3>{convention.title}</h3>
                    <h3>{conventionState}</h3>

                    {
                      convention.life_time > 0 ? (
                        <h3>La duree de la convention est : {convention.life_time} ans </h3>
                      ) : (<h3> La duree de la convention n'est pas encore etablie  </h3>)
                    }
                  </div>
                  <p className="description text-center">
                    L'entreprise {convention.enterprise.name} <br />
                    evolue dans le domaine <br />
                    de {convention.enterprise.field}
                  </p>
                  {
                    convention.life_time === 0 ? (
                      <Button onClick={showModal} className="btn btn-primary">
                        Etablir la duree
                      </Button>
                    ) : (
                        <Button onClick={showModal} className="btn btn-primary">
                          Modifier la duree
                      </Button>
                      )
                  }

                </CardBody>
              </Card>
            </Col>
          ) : ('')
        }
        {
          props.match.params.convId ? (
            <Chat convID={props.match.params.convId} />
          ) : (

              <Chat convID={convention.id} />
            )
        }

        <Modal

          visible={visibleSetTime}
          title="Etablir duree de la convention"
          onCancel={handleCancel}
          footer={''}
        >
          <SetDuration conventionId={convention.id} token={props.token} />
        </Modal>
      </div>
    );
}

const matStateToProps = state => {
  return {
    enterpriseId: state.enterpriseId,
    token: state.token
  }
}

export default connect(matStateToProps)(Convention);
