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
import { baseSite } from '../../config'


let thead = [
    "Logo",
    "Nom",
    "Domaine",
    "Email",
    "Telephone",
    "Est partenaire"
];
function EnterpriseTable(props) {
    const [enterprises, setEnterprise] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [enterprisePerPage] = useState(3);

    const goto = url => {
        props.history.push(url);
    };

    useEffect(() => {
        const fetchEnterprise = async () => {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));
            axios.defaults.headers = {
                "Content-Type": "Application/json",
                Authorization: `Token ${user.token}`
            };
            const params = new URLSearchParams(props.location.search);
            const searchValue = params.get('search')
            const res = await axios(
                `${baseSite}/internship/enterprise/?search=${searchValue}`
            );
            setEnterprise(res.data);
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
                                Liste des Entreprises
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
                                                    <td>Oui</td>
                                                ) : (
                                                        <td>Non</td>
                                                    )
                                                }

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
