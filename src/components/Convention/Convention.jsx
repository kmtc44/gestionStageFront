import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import { connect } from "react-redux";
import "../../assets/css/login.css";

import { Card, CardBody, Col } from "reactstrap";

const baseSite = "http://localhost:8000";

function Convention(props) {
  const [convention, setConvention] = useState();
  const [loading, setLoading] = useState(true);

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
                    <h3>{convention.state}</h3>
                    <h4>{convention.title} </h4>
                  </div>
                  <p className="description text-center">
                    L'entreprise {convention.enterprise.name} <br />
                    evolue dans le domaine <br />
                    de {convention.enterprise.field}
                  </p>
                </CardBody>
              </Card>
            </Col>
          ) : ('')
        }
      </div>
    );
}

const matStateToProps = state => {
  return {
    enterpriseId: state.enterpriseId
  }
}

export default connect(matStateToProps)(Convention);
