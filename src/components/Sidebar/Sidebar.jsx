/*eslint-disable*/
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, Collapse } from "reactstrap";
import { Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// import logo from "./../../logo-white.svg";
import logo from "../../assets/img/ept.png";

var ps;

class Sidebar extends React.Component {
  state = {
    conventionMenuOpen: false,
    studentMenuOpen: false,
    enterpriseMenuOpen: false,
    taskMenuOpen: false,
    projectMenuOpen: false
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
        className="sidebar"
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
            <div className="nav">
              <li>
                {
                  this.props.status === 'teacher' ? (
                    <>
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
                          <i className={"now-ui-icons business_globe"} />
                          <p>
                            Entreprise
                        <b className="caret" />
                          </p>
                        </a>
                        <Collapse isOpen={this.state.enterpriseMenuOpen}>
                          <div>
                            <ul className="nav pl-3">
                              <li
                                className={
                                  this.activeRoute("/dashboard/enterprise/new")
                                    ? "active"
                                    : null
                                }
                              >
                                <NavLink
                                  className="nav-link"
                                  activeClassName="active"
                                  to="/dashboard/enterprise/new"
                                >
                                  <i className={"now-ui-icons ui-1_simple-add"} />
                                  Ajouter
                            </NavLink>
                              </li>
                              <li
                                className={
                                  this.activeRoute("/dashboard/enterprise/partner")
                                    ? "active"
                                    : null
                                }
                              >
                                <NavLink
                                  className="nav-link"
                                  activeClassName="active"
                                  to="/dashboard/enterprise/partner"
                                >
                                  <i
                                    className={"now-ui-icons design_bullet-list-67"}
                                  />
                                  Liste des partenaires
                            </NavLink>
                              </li>
                              <li
                                className={
                                  this.activeRoute("/dashboard/enterprise/potential")
                                    ? "active"
                                    : null
                                }
                              >
                                <NavLink
                                  className="nav-link"
                                  activeClassName="active"
                                  to="/dashboard/enterprise/potential"
                                >
                                  <i
                                    className={"now-ui-icons design_bullet-list-67"}
                                  />
                                  Liste des potentielles
                            </NavLink>
                              </li>
                            </ul>
                          </div>
                        </Collapse>
                      </li>
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
                          <i className="now-ui-icons design_app" />
                          <p>
                            Convention
                      <b className="caret" />
                          </p>
                        </a>
                        <Collapse isOpen={this.state.conventionMenuOpen}>
                          <div className="nav pl-3">
                            <li
                              className={
                                this.activeRoute("/conventions/new") ? "active" : null
                              }
                            >
                              <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="/dashboard/conventions/new"
                              >
                                <i className={"now-ui-icons ui-1_simple-add"} />
                                Creer une nouvelle convention
                        </NavLink>
                            </li>
                            <li
                              className={
                                this.activeRoute("/conventions/all")
                                  ? "active "
                                  : null
                              }
                            >
                              <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="/dashboard/conventions/all"
                              >
                                <i className={"now-ui-icons design_bullet-list-67"} />
                                Liste de conventions
                        </NavLink>
                            </li>
                          </div>
                        </Collapse>
                      </li>

                    </>
                  ) : ("")
                }
                <li
                  className={
                    this.activeRoute("/students") ||
                      this.state.conventionMenuOpen
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
                    <i className={"now-ui-icons education_hat"} />
                    <p>
                      Eleves
                      <b className="caret" />
                    </p>
                  </a>
                  <Collapse isOpen={this.state.studentMenuOpen}>
                    <div>
                      <ul className="nav pl-3">
                        <li
                          className={
                            this.activeRoute("/dashboard/students/dic1")
                              ? "active"
                              : null
                          }
                        >
                          <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/dashboard/students/dic1"
                          >
                            <i className={"now-ui-icons users_circle-08"} />
                            DIC1
                          </NavLink>
                        </li>
                        <li
                          className={
                            this.activeRoute("/dashboard/students/dic2")
                              ? "active"
                              : null
                          }
                        >
                          <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/dashboard/students/dic2"
                          >
                            <i className={"now-ui-icons users_circle-08"} />
                            DIC2
                          </NavLink>
                        </li>
                        <li
                          className={
                            this.activeRoute("/dashboard/students/dic3")
                              ? "active"
                              : null
                          }
                        >
                          <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/dashboard/students/dic3"
                          >
                            <i className={"now-ui-icons users_circle-08"} />
                            DIC 3
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </li>


                <li
                  className={
                    this.activeRoute("/project") || this.state.taskMenuOpen
                      ? "active-pro"
                      : null
                  }
                >
                  <a
                    onClick={() =>
                      this.setState({
                        projectMenuOpen: !this.state.projectMenuOpen
                      })
                    }
                    data-toggle="collapse"
                  >
                    <i className={"now-ui-icons tech_tv"} />
                    <p>
                      Projet
                      <b className="caret" />
                    </p>
                  </a>
                  <Collapse isOpen={this.state.projectMenuOpen}>
                    <div>
                      <li className="nav pl-2">
                        <li
                          className={
                            this.activeRoute("/dashboard/project/new")
                              ? "active"
                              : null
                          }
                        >
                          <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/dashboard/project/new"
                          >
                            <i className={"now-ui-icons ui-1_simple-add"} />
                            Creer un nouveau projet
                          </NavLink>
                        </li>
                        <li
                          className={
                            this.activeRoute("/dashboard/project/all")
                              ? "active"
                              : null
                          }
                        >
                          <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/dashboard/project/all"
                          >
                            <i
                              className={"now-ui-icons design_bullet-list-67"}
                            />
                            Liste des projets
                          </NavLink>
                        </li>
                      </li>
                    </div>
                  </Collapse>
                </li>

                <li
                  className={
                    this.activeRoute("/task") || this.state.taskMenuOpen
                      ? "active-pro"
                      : null
                  }
                >
                  <a
                    onClick={() =>
                      this.setState({
                        taskMenuOpen: !this.state.taskMenuOpen
                      })
                    }
                    data-toggle="collapse"
                  >
                    <i className={"now-ui-icons education_agenda-bookmark"} />
                    <p>
                      Tache
                      <b className="caret" />
                    </p>
                  </a>
                  <Collapse isOpen={this.state.taskMenuOpen}>
                    <div>
                      <li className="nav pl-2">
                        <li
                          className={
                            this.activeRoute("/dashboard/task/new")
                              ? "active"
                              : null
                          }
                        >
                          <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/dashboard/task/new"
                          >
                            <i className={"now-ui-icons ui-1_simple-add"} />
                            Creer une nouvelle tache
                          </NavLink>
                        </li>
                        <li
                          className={
                            this.activeRoute("/dashboard/task/all")
                              ? "active"
                              : null
                          }
                        >
                          <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/dashboard/task/all"
                          >
                            <i
                              className={"now-ui-icons design_bullet-list-67"}
                            />
                            Liste de taches
                          </NavLink>
                        </li>
                      </li>
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
            </div>
          </Nav>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  routes: PropTypes.array
};

const mapStateToProps = state => {
  return {
    status: state.status
  }
}
export default connect(mapStateToProps)(Sidebar);
