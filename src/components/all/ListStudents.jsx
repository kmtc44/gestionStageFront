import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Spin } from "antd";
import "../../assets/css/login.css";

const baseSite = "http://localhost:8000";
function StudentTable(props) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
    };

    fetchStudent();
  }, [props.location.pathname]);

  return loading ? (
    <Spin className="center container " />
  ) : (
    <div className="card">
      <div className="header text-center">
        <h4>Listes des eleves </h4>
        <p className="category">
          {" "}
          les eleves de la {props.location.pathname.substring(20, 24)}{" "}
        </p>
        <br />
      </div>
      <div className="content table-responsive table-full-width">
        <table className="table table-bigboy">
          <thead>
            <tr>
              <th className="text-center">Image </th>
              <th>Prenom</th>
              <th>Nom</th>
              <th>Birthdate</th>
              <th> Operation </th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr>
                <td className="img-students">
                  <div className="img-container">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="img-thumbnail"
                    />
                  </div>
                </td>
                <td className="td-name">{student.first_name}</td>
                <td>{student.last_name}</td>
                <td className="td-number">
                  {moment(student.birthdate).format("YYYY-MM-DD")}
                </td>
                <td className="td-actions">
                  <button
                    type="button"
                    rel="tooltip"
                    data-placement="left"
                    title="Voir L'eleve "
                    className="btn btn-info btn-simple btn-icon"
                    data-original-title="View Post"
                  >
                    <i className="fa fa-image" />
                  </button>
                  <button
                    type="button"
                    rel="tooltip"
                    data-placement="left"
                    title="Modifier"
                    className="btn btn-success btn-simple btn-icon"
                    data-original-title="Edit Post"
                  >
                    <i className="fa fa-edit" />
                  </button>
                  <button
                    type="button"
                    rel="tooltip"
                    data-placement="left"
                    title="Supprimer"
                    className="btn btn-danger btn-simple btn-icon "
                    data-original-title="Remove Post"
                  >
                    <i className="fa fa-times" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
