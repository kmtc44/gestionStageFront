import React, { Component } from "react";
import Ept from "../statics/ept.png";
import "../styles/header.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <header
        id="navbar"
        role="banner"
        className="navbar container navbar-dark bg-primary"
      >
        <div className="container">
          <div className="navbar-header" />
        </div>
        <div className="logo_disconnect">
          <a href="/#">
            <img id="homeImage" src={Ept} alt="Home" />
          </a>
        </div>
        <div className="title">Plateforme STAGE</div>
      </header>
    );
  }
}

export default Header;
