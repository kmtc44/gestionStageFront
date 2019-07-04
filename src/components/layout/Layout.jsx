import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DemoNavbar from "../Navbars/DemoNavbar";
import PanelHeader from "../PanelHeader/PanelHeader";

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
  //   componentDidUpdate(e) {
  //     if (e.history.action === "PUSH") {
  //       this.mainPanel.current.scrollTop = 0;
  //       document.scrollingElement.scrollTop = 0;
  //     }
  //   }
  handleColorClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div>
        <Sidebar {...this.props} />
        <PanelHeader size="sm" />
        <DemoNavbar {...this.props} />
      </div>
    );
  }
}

export default Layout;
