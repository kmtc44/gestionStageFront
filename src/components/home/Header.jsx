import React from "react";
import Ept from "../../assets/img/ept.png";
import { Row, Col } from "antd";
import "../../assets/css/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="head container">
      <Row>
        <Col span={9}>
          {" "}
          <div className="logo_disconnect">
            <Link to="/">
              <img id="homeImage" src={Ept} alt="Home" />
            </Link>
          </div>
        </Col>
        <Col span={15}>
          <p className="title text-justify">
            <span>Plateforme de gestion des stages</span>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
