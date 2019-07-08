import React from "react";
import { Link } from "react-router-dom";
import student from "../../assets/img/student.png";
import administration from "../../assets/img/administration-icon.jpg";
import enterprise from "../../assets/img/enterprise.png";
import { Row, Col } from "reactstrap";

const Menu = () => {
  return (
    <div className="container mx-auto authTable p-5">
      <Row>
        <Col xs={12} md={4}>
          <Link to="/login/student">
            <img className="imgAuth" src={student} alt="" />
            <div>
              <h4>
                <span className="text-justify ml-5">Accès Elèves</span>
              </h4>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={4}>
          <Link to="/login/administration">
            <img className="imgAuth" src={administration} alt="" />
            <div>
              <h4>
                <span className="text-justify ml-5">Accès Administration</span>
              </h4>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={4}>
          <Link to="/login/enterprise">
            <img className="imgAuth" src={enterprise} alt="" />
            <div>
              <h4>
                <span className="text-justify ml-5">Accès Entreprise</span>
              </h4>
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
export default Menu;
