import React, { Component } from "react";

class Project extends Component {
  render() {
    return <div>le projet {this.props.match.params.projectId}</div>;
  }
}

export default Project;
