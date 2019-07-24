import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import { Spin } from "antd";
import { Card, CardTitle, CardText, Row, Col } from "reactstrap";
import Pagination from "../Pagination";

const baseSite = "http://localhost:8000";
function ListRapports(props) {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [studentPerPage] = useState(4);

	const chooseRoom = path => {
		const p = path.substring(20, 24);
		switch (p) {
			case "dic1":
				return 1;
			case "dic2":
				return 2;
			case "dic3":
				return 3;
			default:
				return 1;
		}
	};

	useEffect(() => {
		const fetchStudent = async () => {
			setLoading(true);
			const user = JSON.parse(localStorage.getItem("user"));
			axios.defaults.headers = {
				"Content-Type": "Application/json",
				Authorization: `Token ${user.token}`
			};
			const res = await axios(
				`${baseSite}/classroom/${chooseRoom(props.location.pathname)}`
			);
			setStudents(res.data.students.filter(student => student.attachments));
			setCurrentPage(1)
			setLoading(false);
		};

		fetchStudent();
	}, [props.location.pathname]);

	//Guetting the current students

	const indexOfLastStudent = currentPage * studentPerPage;
	const indexOfFirstStudent = indexOfLastStudent - studentPerPage;
	const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);


	//Changing page with paginate method
	const paginate = (pageNumber) => setCurrentPage(pageNumber);


	return loading ? (
		<Spin className="center container " />
	) : (
			< div className="content mt-3 ml-4 p-5 center" >
				<Row className="cardRapHolder">
					{currentStudents.map(student => {
						return (
							<Col key={student.id} sm="6" lg="3" md="4" xs="9">
								{
									student.attachments.rapport ? (
										<Link to={`/dashboard/rapport/detail/${student.id}`}>
											<Card body style={{ color: 'black' }}>
												<CardTitle
													style={{
														fontSize: 20,
														fontWeight: "bold",
														height: 50,
													}}
												>
													Rapport de Stage
										</CardTitle>
												<CardText>
													<span style={{
														fontSize: 18,
														fontWeight: "bold",

													}} > {student.first_name} {" "} {student.last_name} </span><br />
													Departement : {student.department.name} {" "} <br />
													Classe : {student.classroom.name} {" "} {new Date().getFullYear()} <br />
												</CardText>
											</Card>
										</Link>
									) : (" ")
								}
							</Col>
						);
					})}
				</Row>
				{
					students.length > students ? (

						<Pagination currentPage={currentPage} itemPerPage={studentPerPage}
							totalItems={students.length}
							paginate={paginate} />
					) : ("")
				}
			</div >

		);
}


export default ListRapports 