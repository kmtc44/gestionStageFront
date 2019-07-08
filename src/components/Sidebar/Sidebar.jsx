/*eslint-disable*/
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, Collapse } from "reactstrap";
import { Button } from "antd";
import PropTypes from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// import logo from "./../../logo-white.svg";
import logo from "../../assets/img/ept.png";

var ps;

class Sidebar extends React.Component {
  state = {
    conventionMenuOpen: false,
    studentMenuOpen: false,
    enterpriseMenuOpen: false
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  render() {
    return (
      <div
        id="wrapper"
        className="sidebar sidebar-wrapper"
        data-color={this.props.backgroundColor}
      >
        <div className="logo">
          <Link to="/dashboard" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="ept-logo" />
            </div>
          </Link>
          <Link to="/dashboard" className="simple-text logo-normal">
            Gestion des stages
          </Link>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav>
            <li>
              <li
                className={
                  this.activeRoute("/convention") ||
                  this.state.conventionMenuOpen
                    ? "active-pro"
                    : null
                }
              >
                <a
                  onClick={() =>
                    this.setState({
                      conventionMenuOpen: !this.state.conventionMenuOpen
                    })
                  }
                  data-toggle="collapse"
                >
                  <i className={"now-ui-icons design_app"} />
                  <p>
                    Convention
                    <b className="caret" />
                  </p>
                </a>
                <Collapse isOpen={this.state.conventionMenuOpen}>
                  <div>
                    <li className="nav">
                      <li
                        className={
                          this.activeRoute("/conventions/new") ? "active" : null
                        }
                      >
                        <Link to="/conventions/new">
                          Creer une nouvelle convention
                        </Link>
                      </li>
                      <li
                        className={
                          this.activeRoute("/conventions/list")
                            ? "active"
                            : null
                        }
                      >
                        <Link to="/conventions/list">Liste de conventions</Link>
                      </li>
                    </li>
                  </div>
                </Collapse>
              </li>
              <li
                className={
                  this.activeRoute("/students") || this.state.conventionMenuOpen
                    ? "active-pro"
                    : null
                }
              >
                <a
                  onClick={() =>
                    this.setState({
                      studentMenuOpen: !this.state.studentMenuOpen
                    })
                  }
                  data-toggle="collapse"
                >
                  <i className={"now-ui-icons design_app"} />
                  <p>
                    Eleves
                    <b className="caret" />
                  </p>
                </a>
                <Collapse isOpen={this.state.studentMenuOpen}>
                  <div>
                    <ul className="nav">
                      <li
                        className={
                          this.activeRoute("/dashboard/students/dic1")
                            ? "active"
                            : null
                        }
                      >
                        <Link to="/dashboard/students/dic1">DIC1</Link>
                      </li>
                      <li
                        className={
                          this.activeRoute("/dashboard/students/dic2")
                            ? "active"
                            : null
                        }
                      >
                        <Link to="/dashboard/students/dic2">DIC2</Link>
                      </li>
                      <li
                        className={
                          this.activeRoute("/dashboard/students/dic3")
                            ? "active"
                            : null
                        }
                      >
                        <Link to="/dashboard/students/dic3">DIC 3</Link>
                      </li>
                    </ul>
                  </div>
                </Collapse>
              </li>
              <li
                className={
                  this.activeRoute("/dashboard/enterprise") ||
                  this.state.conventionMenuOpen
                    ? "active-pro"
                    : null
                }
              >
                <a
                  onClick={() =>
                    this.setState({
                      enterpriseMenuOpen: !this.state.enterpriseMenuOpen
                    })
                  }
                  data-toggle="collapse"
                >
                  <i className={"now-ui-icons design_app"} />
                  <p>
                    Entreprise
                    <b className="caret" />
                  </p>
                </a>
                <Collapse isOpen={this.state.enterpriseMenuOpen}>
                  <div>
                    <ul className="nav">
                      <li
                        className={
                          this.activeRoute("/dashboard/enterprise/new")
                            ? "active"
                            : null
                        }
                      >
                        <Link to="/dashboard/enterprise/new">Ajouter</Link>
                      </li>
                      <li
                        className={
                          this.activeRoute("/dashboard/enterprise/partner")
                            ? "active"
                            : null
                        }
                      >
                        <Link to="/dashboard/enterprise/partner">
                          Liste des partenaires
                        </Link>
                      </li>
                      <li
                        className={
                          this.activeRoute("/dashboard/enterprise/potential")
                            ? "active"
                            : null
                        }
                      >
                        <Link to="/dashboard/enterprise/potential">
                          Liste des potentielles
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Collapse>
              </li>
              {this.props.routes.map((prop, key) => {
                if (prop.redirect) return null;
                return (
                  <li
                    className={
                      this.activeRoute(prop.layout + prop.path) +
                      (prop.pro ? " active active-pro" : "")
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={"now-ui-icons " + prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              })}
            </li>
          </Nav>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  routes: PropTypes.array
};

export default Sidebar;
