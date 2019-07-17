import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import "../../assets/css/login.css";

const baseSite = "http://localhost:8000";
let thead = [];
function EnterpriseTable(props) {
  const [enterprises, setEnterprise] = useState([]);
  const [loading, setLoading] = useState(false);

  const goto = url => {
    props.history.push(url);
  };
  const chooseType = path => {
    const p = path.substring(22);
    switch (p) {
      case "partner":
        thead = [
          "Logo",
          "Nom",
          "Domaine",
          "Email",
          "Telephone",
          "Nombre d'etudiants",
          "Nom du directeur"
        ];
        return "partner";
      case "potential":
        thead = [
          "Logo",
          "Nom",
          "Domaine",
          "Email",
          "Telephone",
          "Site Web",
          "Nom du directeur"
        ];
        return "potential";
      default:
        return "partner";
    }
  };

  useEffect(() => {
    const fetchEnterprise = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "Application/json",
        Authorization: `Token ${user.token}`
      };
      const res = await axios(
        `${baseSite}/internship/enterprise/${chooseType(
          props.location.pathname
        )}`
      );
      setEnterprise(res.data);
      setLoading(false);
    };

    fetchEnterprise();
  }, [props.location.pathname]);

  return loading ? (
    <Spin className="center container" />
  ) : (
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <CardTitle tag="h3" className="text-center">
              Liste des Entreprises {props.location.pathname.substring(22)}{" "}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Table hover responsive>
              <thead className="text-primary">
                <tr>
                  {thead.map((prop, key) => {
                    if (key === thead.length - 1)
                      return <th key={key}>{prop}</th>;
                    return <th key={key}>{prop}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {enterprises.map(enterprise => {
                  return (
                    <tr
                      key={enterprise.id}
                      onClick={() => {
                        goto(`/dashboard/enterprise/detail/${enterprise.id}`);
                      }}
                    >
                      <td>
                        {" "}
                        {enterprise.logo ? (
                          <img
                            className="img-student"
                            alt="..."
                            src={enterprise.logo}
                          />
                        ) : (
                          <img
                            className="img-student"
                            alt="..."
                            src={require("../../assets/img/enterprise.png")}
                          />
                        )}
                      </td>
                      <td>{enterprise.name} </td>
                      <td>{enterprise.field}</td>
                      <td>{enterprise.email}</td>
                      <td>{enterprise.phone}</td>
                      {enterprise.is_partner ? (
                        <td>{enterprise.students.length}</td>
                      ) : (
                        ""
                      )}
                      <td>{enterprise.leader_name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default EnterpriseTable;
