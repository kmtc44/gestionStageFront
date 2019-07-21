import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import axios from "axios";
import {
	Card,
	CardGroup,
	CardBody,
	CardImg,
	CardTitle,
	Row,
	Col
} from "reactstrap";
import { Spin } from "antd";

const baseSite = "http://localhost:8000";

function StudentEnterprise(props) {
	const [enterprise, setEnterprise] = useState({})
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEnterprise = async () => {

			const user = JSON.parse(localStorage.getItem("user"));
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: `Token ${user.token}`
			};
			const res = await axios(
				`${baseSite}/internship/enterprise/${props.enterpriseId}`
			);

			setEnterprise(res.data);
			console.log(res.data)
			setLoading(false);
		};
		fetchEnterprise();
	}, [props.enterpriseId])

	return loading ? (
		<Spin className="center container-fluid " />
	) : (
			<div className="container">
				<Row>
					<CardGroup className="mx-auto cardHolder" >
						{enterprise.students.map(student => {
							return (
								<Col key={student.id} md="4" lg="3" sm="9" xs="9">
									<Link to={`/dashboard/student/detail/${student.id}`}>
										<Card style={{ color: 'black' }} >
											{student.image ? (
												<CardImg
													className="img-student-enterprise"
													top
													src={student.image}
													alt="Card image cap"
												/>
											) : (
													<CardImg
														className="img-student-enterprise"
														top
														src={require("../../assets/img/student.png")}
														alt="Card image cap"
													/>
												)}

											<CardTitle style={{ fontSize: "18px" }}>
												{student.first_name} {student.last_name}
											</CardTitle>
											<CardBody>


												<div className="text-left">
													<p>Departement : {student.department.name} </p>
													<p>Classe : {student.classroom.name} </p>
													<p> <i className="now-ui-icons tech_mobile" /> : {student.phone}</p>
													<p>  <i className="now-ui-icons ui-1_email-85" /> : {student.user.email}</p>
												</div>

											</CardBody>
										</Card>
									</Link>
								</Col>
							);
						})}
					</CardGroup>
				</Row>
			</div>
		)
}

const matStateToProps = state => {
	return {
		enterpriseId: state.enterpriseId
	}
}

export default connect(matStateToProps)(StudentEnterprise)