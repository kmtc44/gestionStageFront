import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DemoNavbar from "../Navbars/DemoNavbar";
import PanelHeader from "../PanelHeader/PanelHeader";
import Footer from "../Footer/Footer";
import { Switch, Route } from "react-router-dom";
import routes from "../../routes";
import { connect } from "react-redux";

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
      this.setState({ backgroundColor: "peru" });
    } else if (newProps.status === "teacher") {
      this.setState({ backgroundColor: "blue" });
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
          <DemoNavbar {...this.props} />
          <Switch>
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
    token: state.token
  };
};
export default connect(mapStateToProps)(Layout);
