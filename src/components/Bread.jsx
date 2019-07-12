import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { withRouter, Link } from "react-router-dom";

var hist = new Set();
const Bread = props => {
  function getLastValue(set) {
    let value;
    for (value of set);
    return value;
  }

  // console.log(" this bread props ", props);
  // console.log("the history :", props.history);
  // console.log("the location", props.location);
  // hist.add(props.location.pathname);
  // console.log("the hist ", getLastValue(hist));

  return (
    <div>
      <Breadcrumb tag="nav" listTag="div">
        <BreadcrumbItem>
          <Link to="/dashboard"> Home </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          {" "}
          <Link to> Library </Link>
        </BreadcrumbItem>
        <BreadcrumbItem tag="a" href="#">
          Data
        </BreadcrumbItem>
        <BreadcrumbItem active tag="span">
          Bootstrap
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default withRouter(Bread);
