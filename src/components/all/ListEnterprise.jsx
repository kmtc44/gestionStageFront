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
import Pagination from "../Pagination"


const baseSite = "http://localhost:8000";
let thead = [];
function EnterpriseTable(props) {
  const [enterprises, setEnterprise] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [enterprisePerPage] = useState(3);
  const [enterpriseType, setEnterpriseType] = useState('Partenaire')

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
        setEnterpriseType('Partenaires')
        return "partner";
      case "potential":
        thead = [
          "Logo",
          "Nom",
          "Domaine",
          "Email",
          "Telephone",
          "Nom du directeur"
        ];
        setEnterpriseType('Potentielles')
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
      console.log(props.location.search)

      const params = new URLSearchParams(props.location.search);
      console.log(params.get('search'))
      setLoading(false);
    };

    fetchEnterprise();
  }, [props.location.pathname, props.location.search]);

  //Guetting the current entreprise

  const indexOfLastEnterprise = currentPage * enterprisePerPage;
  const indexOfFirstEnterprise = indexOfLastEnterprise - enterprisePerPage;
  const currentEnterprises = enterprises.slice(indexOfFirstEnterprise, indexOfLastEnterprise);


  //Changing page with paginate method
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return loading ? (
    <Spin className="center container" />
  ) : (
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h3" className="text-center">
                Liste des Entreprises {enterpriseType}{" "}
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
                  {currentEnterprises.map(enterprise => {
                    return (
                      <tr
                        key={enterprise.id}
                        onClick={() => {
                          goto(`/ dashboard / enterprise / detail / ${enterprise.id} `);
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
                          )
                        }
                        <td>{enterprise.leader_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>

          <Pagination currentPage={currentPage} itemPerPage={enterprisePerPage}
            totalItems={enterprises.length}
            paginate={paginate} />


        </Col>
      </Row>

    );
}

export default EnterpriseTable;
