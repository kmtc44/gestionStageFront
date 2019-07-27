import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";
import { Badge } from 'antd';
import axios from "axios"

import routes from "../../routes.js";
import * as action from "../../store/actions/auth";
import { connect } from "react-redux";

const baseSite = "http://localhost:8000";
class Header extends Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    color: "transparent",
    searchValue: '',
    dropdownOpenNotif: false,
    notifications: [],
    loading: true
  };
  sidebarToggle = React.createRef();
  toggle = () => {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      });
    } else {
      this.setState({
        color: "white"
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  dropdownToggle = e => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  fetchNotification = (token, status, statusId) => {
    axios.defaults.headers = {
      "Content-Type": "Application/json",
      Authorization: `Token ${token}`
    }
    axios.get(`${baseSite}/${status}/${statusId}`)
      .then(res => {
        this.setState({ notifications: res.data.user.receivedNotif })
        console.log(res.data.user.receivedNotif);
        this.setState({ loading: false })
      })
  }
  dropdownToggleNotif = e => {
    this.setState({
      dropdownOpenNotif: !this.state.dropdownOpenNotif
    });
  };
  onReadNotif = (e) => {
    console.log(e.target.getAttribute('value'))
    axios.put(`${baseSite}/notifications/${e.target.getAttribute('value')}/`, {
      read: this.props.userId
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }
  getBrand = () => {
    var name;
    routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  };
  openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "white"
      });
    } else {
      this.setState({
        color: "transparent"
      });
    }
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
    setInterval(this.fetchNotification, 5000)
    this.fetchNotification()
  }
  fetchNotification = () => {
    axios.defaults.headers = {
      "Content-Type": "Application/json",
      Authorization: `Token ${this.props.token}`
    }
    axios.get(`${baseSite}/${this.props.status}/${this.props.statusId}`)
      .then(res => {
        this.setState({ notifications: res.data.user.receivedNotif })
        console.log(res.data.user.receivedNotif);
        this.setState({ loading: false })
      })
  }
  // componentWillReceiveProps(newProps) {
  //   const { status, statusId, token } = newProps

  //   this.fetchNotification(token, status, statusId)
  //   setTimeout(this.fetchNotification, 1000)

  // }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
  onSearch = e => {
    this.setState({ searchValue: e.target.value })
  }
  handleSearchEnterprise = e => {
    e.preventDefault()
    this.props.history.push(`/dashboard/enterprise/search/?search=${this.state.searchValue}`)
  }

  handleSearchStudent = e => {
    e.preventDefault()
    this.props.history.push(`/dashboard/students/search/?search=${this.state.searchValue}`)
  }
  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "white"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
            (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            {
              this.props.status === 'teachers' ? (

                <form onSubmit={this.handleSearchEnterprise}>
                  <InputGroup className="no-border">
                    <Input placeholder="Entreprises..." onChange={this.onSearch} />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_zoom-bold" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              ) : ('')
            }
            {
              this.props.status !== 'framers' ? (

                <form onSubmit={this.handleSearchStudent}>
                  <InputGroup className="no-border">
                    <Input placeholder="Eleves..." onChange={this.onSearch} />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_zoom-bold" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              ) : ('')
            }
            <Nav navbar>

              {/* <NavItem>
                <Link to="#pablo" className="nav-link">
                  <i className="now-ui-icons media-2_sound-wave" />
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </Link>
              </NavItem> */}


              <Dropdown
                nav
                isOpen={this.state.dropdownOpenNotif}
                toggle={e => this.dropdownToggleNotif(e)}
              >
                <DropdownToggle caret nav>
                  <i className="now-ui-icons ui-1_bell-53" />
                  <p>
                    <span className="d-lg-none d-md-block">Notification</span>
                    <Badge count={this.state.notifications.length} style={{ width: "1px", height: "15px", paddingBottom: "2px" }} />
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  {
                    this.state.notifications ? (
                      <>
                        {
                          this.state.notifications.map(notification => {
                            return (
                              <>
                                {
                                  this.props.status === 'students' ? (
                                    <>
                                      {
                                        notification.rapport_student ? (
                                          <DropdownItem >
                                            {" "}
                                            <Link onClick={this.onReadNotif} value={notification.id} style={{ color: "black" }} to={`/dashboard/student/rapport/`}>
                                              {notification.title}{" "}
                                            </Link>
                                          </DropdownItem>
                                        ) : (
                                            <>
                                              {
                                                notification.rapport ? (
                                                  <DropdownItem >
                                                    {" "}
                                                    <Link onClick={this.onReadNotif} value={notification.id} style={{ color: "black" }} to={`/dashboard/project/detail/${notification.rapport}`}>
                                                      {notification.title}{" "}
                                                    </Link>
                                                  </DropdownItem>
                                                ) : ('')
                                              }
                                            </>
                                          )
                                      }
                                    </>
                                  ) : (
                                      <>
                                        {
                                          notification.rapport_student ? (
                                            <DropdownItem >
                                              {" "}
                                              <Link onClick={this.onReadNotif} value={notification.id} style={{ color: "black" }} to={`/dashboard/rapport/detail/${notification.rapport_student}`}>
                                                {notification.title}{" "}
                                              </Link>
                                            </DropdownItem>
                                          ) : (
                                              <>
                                                {
                                                  notification.rapport ? (
                                                    <DropdownItem >
                                                      {" "}
                                                      <Link onClick={this.onReadNotif} value={notification.id} style={{ color: "black" }} to={`/dashboard/project/detail/${notification.rapport}`}>
                                                        {notification.title}{" "}
                                                      </Link>
                                                    </DropdownItem>
                                                  ) : ('')
                                                }
                                              </>
                                            )
                                        }
                                      </>
                                    )
                                }
                              </>
                            )
                          })
                        }
                      </>
                    ) : ('')
                  }
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="now-ui-icons users_single-02" />
                  <p>
                    <span className="d-lg-none d-md-block">Compte </span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    {" "}
                    <Link style={{ color: "black" }} to="/dashboard/profile">
                      {" "}
                      Profile{" "}
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    style={{ color: "black" }}
                    tag="a"
                    onClick={this.props.logout}
                  >
                    Logout
                  </DropdownItem>

                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.status + 's',
    statusId: state.statusId,
    token: state.token,
    userId: state.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(action.authLogout());
    }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
