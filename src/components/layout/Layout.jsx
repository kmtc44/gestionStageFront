import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DemoNavbar from "../Navbars/DemoNavbar";
import PanelHeader from "../PanelHeader/PanelHeader";
import Footer from "../Footer/Footer";
import { Switch, Route } from "react-router-dom";
import routes from "../../routes";
import { connect } from "react-redux";
import ListStudents from "../all/ListStudents";
import ListEnterprises from "../all/ListEnterprise";
import Enterprise from "../all/Enterprise";
import FormEnterprise from "../all/FormEnterprise";
import FormConvention from "../Convention/FormConvention";
import ListConventions from "../Convention/ListConvention";
import Convention from "../Convention/Convention";
import FormTask from "../Task/FormTask";
import AllTaks from "../Task/AllTask";
import Profile from "../Profile/Profile";
import FormProject from "../Project/FormProject";
import ListProject from "../Project/ListProject";
import Project from "../Project/Project";

import Bread from "../Bread";

import PerfectScrollbar from "perfect-scrollbar";

var ps;

class Layout extends Component {
  state = {
    backgroundColor: "blue"
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }

    if (this.props.status === "student") {
      this.setState({ backgroundColor: "blue" });
    } else if (this.props.status === "teacher") {
      this.setState({ backgroundColor: "orange" });
    } else if (this.props.status === "framer") {
      this.setState({ backgroundColor: "green" });
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
  componentWillReceiveProps(newProps) {
    if (newProps.status === "student") {
      this.setState({ backgroundColor: "blue" });
    } else if (newProps.status === "teacher") {
      this.setState({ backgroundColor: "orange" });
    } else if (newProps.status === "framer") {
      this.setState({ backgroundColor: "green" });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar
          routes={routes}
          {...this.props}
          backgroundColor={this.state.backgroundColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <PanelHeader size="sm" />
          <Bread />
          <DemoNavbar {...this.props} />

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
                  path="/dashboard/conventions/all"
                  component={ListConventions}
                />
              </Switch>
            ) : (
                ''
              )
          }
          {
            this.props.status === 'framer' ? (
              <Switch>
                <Route
                  exact
                  path="/dashboard/project/new"
                  component={FormProject}
                />
                <Route exact path="/dashboard/task/new" component={FormTask} />
              </Switch>
            ) : ('')
          }
          <Switch>
            <Route
              exact
              path="/dashboard/project/detail/:projectId"

              component={Project}
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

            <Route path="/dashboard/task/all" component={AllTaks} />
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
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

  };
};
export default connect(mapStateToProps)(Layout);
