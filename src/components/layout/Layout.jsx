import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DemoNavbar from "../Navbars/DemoNavbar";
import PanelHeader from "../PanelHeader/PanelHeader";
import Footer from "../Footer/Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../../routes";
import { connect } from "react-redux";
import ListStudents from "../all/ListStudents";
import SearchStudent from "../all/SearchStudent"
import ListEnterprises from "../all/ListEnterprise";
import SearchEnterprises from "../all/SearchEnterprise";
import Enterprise from "../all/Enterprise";
import FormEnterprise from "../all/FormEnterprise";
import FormConvention from "../Convention/FormConvention";
import ListConventions from "../Convention/ListConvention";
import Convention from "../Convention/Convention";
import FormTask from "../Task/FormTask";
import AllTask from "../Task/AllTask";
import Profile from "../Profile/Profile";
import FormProject from "../Project/FormProject";
import ListProject from "../Project/ListProject";
import Project from "../Project/Project";
import StudentEnterprise from "../all/StudentEnterprise"
import ListRapports from "../Rapport/ListRapports"
import Rapport from "../Rapport/Rapport"
import Maps from '../Maps/Maps'
import Bread from '../Bread'


import PerfectScrollbar from "perfect-scrollbar";


var ps;

class Layout extends Component {
  state = {
    backgroundColor: "blue",
    style: {}
  };

  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }

    if (this.props.status === "student") {
      this.setState({
        style: {
          backgroundColor: "rgb(30, 100, 255, 0.9)"
        }
      });
    } else if (this.props.status === "teacher") {
      this.setState({
        style: {
          backgroundColor: "rgba(40, 150, 255, 0.9)"
        }
      });
    } else if (this.props.status === "framer") {
      this.setState({
        style: {
          backgroundColor: "rgb(20, 200, 255, 0.9)"
        }
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleColorClick = color => {
    this.setState({ backgroundColor: color });
  };
  // componentWillReceiveProps(newProps) {
  //   if (newProps.status === "student") {
  //     this.setState({
  //       style: {
  //         backgroundColor: "rgba(14, 218, 233, 0.973)"
  //       }
  //     });
  //   } else if (newProps.status === "teacher") {
  //     this.setState({
  //       style: {
  //         backgroundColor: "rgba(0, 195, 255, 0.473)"
  //       }
  //     });
  //   } else if (newProps.status === "framer") {
  //     this.setState({
  //       style: {
  //         backgroundColor: "rgb(9, 114, 252)"
  //       }
  //     });
  //   }
  // }

  render() {
    return (
      <div className="wrapper">
        <Sidebar
          routes={routes}
          {...this.props}
          backgroundColor={this.state.backgroundColor}
          style={this.state.style}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <PanelHeader size="sm" />
          <Bread />
          <DemoNavbar {...this.props} />
          <Switch>
            <Route
              exact
              path="/dashboard/project/detail/:projectId"
              component={Project}
            />

            <Route
              exact
              path="/dashboard/students/search/"
              component={SearchStudent}
            />

            <Route
              exact
              path="/dashboard/student/detail/:studentId"
              component={Profile}
            />

            <Route
              exact
              path="/dashboard/project/all"
              component={ListProject}
            />

            <Route path="/dashboard/students/" component={ListStudents} />

            <Route path="/dashboard/task/all" component={AllTask} />

            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}

            {
              this.props.status === 'framer' ? (
                <Switch>
                  <Route
                    exact
                    path="/dashboard/project/new"
                    component={FormProject}
                  />
                  <Route
                    exact
                    path="/dashboard/enterprise/convention/"
                    component={Convention}
                  />

                  <Route
                    exact
                    path="/dashboard/rapport/detail/:rapportId"
                    component={Rapport}
                  />
                  <Route
                    path="/dashboard/enterprise/rapports/"
                    component={ListRapports}
                  />

                  <Route exact path="/dashboard/task/new" component={FormTask} />
                  <Route
                    exact
                    path="/dashboard/enterprise/student"
                    component={StudentEnterprise}
                  />
                  <Redirect from="/dashboard" to="/dashboard/enterprise/convention/" />
                </Switch>
              ) : ('')
            }

            {
              this.props.status === 'teacher' ? (
                <Switch>
                  <Route
                    exact
                    path="/dashboard/enterprise/detail/:enterpriseId"
                    component={Enterprise}
                  />
                  <Route
                    exact
                    path="/dashboard/enterprise/new"
                    component={FormEnterprise}
                  />

                  <Route exact path="/dashboard/enterprise/search/" component={SearchEnterprises} />
                  <Route path="/dashboard/enterprise/" component={ListEnterprises} />
                  <Route
                    exact
                    path="/dashboard/convention/detail/:convId"
                    component={Convention}
                  />
                  <Route
                    exact
                    path="/dashboard/conventions/new"
                    component={FormConvention}
                  />
                  <Route
                    exact
                    path="/dashboard/rapport/detail/:rapportId"
                    component={Rapport}
                  />
                  <Route
                    path="/dashboard/rapports/"
                    component={ListRapports}
                  />

                  <Route
                    path="/dashboard/conventions/all"
                    component={ListConventions}
                  />
                  <Route
                    path="/dashboard/maps/all"
                    component={Maps}
                  />

                  <Redirect from="/dashboard" to="/dashboard/conventions/all" />
                </Switch>
              ) : (
                  ''
                )
            }

            {
              this.props.status === 'student' ? (
                <Switch>
                  <Route
                    exact
                    path="/dashboard/student/rapport/"
                    component={Rapport}
                  />
                  <Route
                    exact
                    path="/dashboard/student/enterprise/"
                    component={Enterprise}
                  />
                  <Route
                    exact
                    path="/dashboard/students/search/"
                    component={SearchStudent}
                  />
                  {
                    this.props.studentEnterprise ? (
                      <Redirect from="/dashboard" to="/dashboard/student/enterprise/" />
                    ) : (
                        <Redirect from="/dashboard" to="/dashboard/profile/" />
                      )
                  }
                </Switch>
              ) : ("")
            }

          </Switch>

          <Footer fluid />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.status,
    token: state.token,
    studentEnterprise: state.studentEnterprise
  };
};
export default connect(mapStateToProps)(Layout);
