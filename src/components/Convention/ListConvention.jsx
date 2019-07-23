import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import "../../assets/css/login.css";
import {
  Button,
  Card,
  CardGroup,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Col
} from "reactstrap";

const baseSite = "http://localhost:8000";
function ListConvention(props) {
  const [conventions, setConvention] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConvention = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "Application/json",
        Authorization: `Token ${user.token}`
      };
      const res = await axios(`${baseSite}/internship/convention/`);
      setConvention(res.data);
      setLoading(false);
    };

    fetchConvention();
  }, []);

  return loading ? (
    <Spin className="center container" />
  ) : (
      <div className="container">
        <CardGroup className="mx-auto cardHolder">
          {conventions.map((convention) => {
            return (
              <Col md="4" lg="3" sm="4" key={convention.id}>
                <Link to={`/dashboard/convention/detail/${convention.id}`}>
                  <Card className="m-1" >
                    {convention.enterprise.logo ? (
                      <CardImg
                        className="img-student-enterprise"
                        top
                        src={convention.enterprise.logo}
                        alt="Card image cap"
                      />

                    ) : (

                        <CardImg
                          className="img-student-enterprise"
                          top
                          src={require("../../assets/img/convention.jpg")}
                          alt="Card image cap"
                        />

                      )}
                    <CardBody>
                      <CardTitle style={{ fontSize: 17, fontWeight: "bold" }}>
                        {convention.title}
                      </CardTitle>
                      <CardSubtitle style={{ fontSize: 15 }}>
                        Cooperation avec {convention.enterprise.name}
                      </CardSubtitle>
                      <CardText>
                        Le partenariat avec {convention.enterprise.name} a commence
                    le {moment.locale(convention.starting_date)}
                      </CardText>
                    </CardBody>
                  </Card>
                </Link>
                <Button className="btn btn-danger">
                  Supprimer
                    </Button>
              </Col>
            );
          })}
        </CardGroup>
      </div>
    );
}
export default ListConvention;
