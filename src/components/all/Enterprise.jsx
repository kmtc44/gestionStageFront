import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import "../../assets/css/login.css";
import {
  Button,
  Card,
  CardHeader,
  CardGroup,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col
} from "reactstrap";

const baseSite = "http://localhost:8000";

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

  console.log(enterprise);
  return loading ? (
    <Spin className="center container " />
  ) : (
    <div>
      {" "}
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
              <a href="#pablo" onClick={e => e.preventDefault()}>
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
            <p className="description text-center">
              L'entreprise {enterprise.name} <br />
              evolue dans le domaine <br />
              de {enterprise.field}"
            </p>
          </CardBody>
        </Card>
      </Col>
      {enterprise.students ? (
        <div className="container">
          <h3 className="text-center">
            {" "}
            {enterprise.students[0]
              ? " Listes des eleves dans cette entreprise "
              : ""}
          </h3>

          <Row>
            <CardGroup className="mx-auto">
              {enterprise.students.map((student, index) => {
                return (
                  <Col md="3" sm="9">
                    <Card key={index}>
                      {student.image ? (
                        <CardImg
                          top
                          width="20%"
                          height="25%"
                          src={student.image}
                          alt="Card image cap"
                        />
                      ) : (
                        <CardImg
                          top
                          width="20%"
                          src={require("../../assets/img/student.png")}
                          alt="Card image cap"
                        />
                      )}
                      <CardBody>
                        <CardTitle>
                          {student.first_name} {student.last_name}
                        </CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </CardText>
                        <Button>Button</Button>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
            </CardGroup>
          </Row>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Enterprise;
