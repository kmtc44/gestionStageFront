import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import "../../assets/css/login.css";

import { Card, CardBody, Col } from "reactstrap";

const baseSite = "http://localhost:8000";

function Convention(props) {
  const [convention, setConvention] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnterprise = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`
      };
      const res = await axios(
        `${baseSite}/internship/convention/${props.match.params.convId}`
      );

      setConvention(res.data);
      console.log(res.data);
      setLoading(false);
    };
    fetchEnterprise();
  }, [props.match.params.convId]);

  return loading ? (
    <Spin className="center container-fluid " />
  ) : (
    <div>
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
    </div>
  );
}

export default Convention;
