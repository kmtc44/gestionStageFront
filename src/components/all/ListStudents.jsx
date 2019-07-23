import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Spin } from "antd";
import "../../assets/css/login.css";
import Pagination from "../Pagination";

const baseSite = "http://localhost:8000";
function StudentTable(props) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentPerPage] = useState(4);

  const goto = url => {
    props.history.push(url);
  };

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
      setStudents(res.data.students);
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
      <div className="card">
        <div className="header text-center">
          <h3>Listes des eleves </h3>
          <h4 className="category">
            {" "}
            les eleves de la {props.location.pathname.substring(20, 24)}{" "}
          </h4>
          <br />
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-bigboy table-hover">
            <thead className="text-primary">
              <tr>
                <th className="text-center">Image </th>
                <th>Prenom</th>
                <th>Nom</th>
                <th>Date de naissance</th>
                <th> Email </th>
                <th> Telephone </th>
                <th> Entreprise </th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map(student => (
                <tr
                  key={student.id}
                  onClick={() => {
                    goto(`/dashboard/student/detail/${student.id}`);
                  }}
                >
                  <td>
                    {student.image ? (
                      <div className="img-container">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="img-thumbnail img-student"
                        />
                      </div>
                    ) : (
                        <div className="img-container">
                          <img
                            src={require("../../assets/img/student.png")}
                            alt={student.name}
                            className="img-thumbnail img-student"
                          />
                        </div>
                      )}
                  </td>
                  <td className="td-student">{student.first_name}</td>
                  <td className="td-student">{student.last_name}</td>
                  <td className="td-student">
                    {moment(student.birthday).format("YYYY-MM-DD")}
                  </td>
                  <td className="td-student">{student.user.email}</td>
                  <td className="td-student">{student.phone}</td>
                  {student.enterprise ? (
                    <td className="td-student">{student.enterprise.name}</td>
                  ) : (
                      <td className="td-student" />
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {
          students.length > studentPerPage ? (
            <Pagination currentPage={currentPage} itemPerPage={studentPerPage}
              totalItems={students.length}
              paginate={paginate} />
          ) : ("")
        }
      </div>
    );
}

export default StudentTable;
