import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import "../../assets/css/login.css";

const baseSite = "http://localhost:8000";

function Enterprise(props) {
  const [enterprise, setEnterprise] = useState({});
  const [loading, setLoading] = useState(false);

  const enterpriseId = path => path.substring(29);

  useEffect(() => {
    const fetchEnterprise = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`
      };
      const res = await axios(
        `${baseSite}/internship/enterprise/${enterpriseId(
          props.location.pathname
        )}`
      );

      setEnterprise(res.data);
      setLoading(false);
    };
    fetchEnterprise();
  }, [props.location.pathname]);

  console.log(enterprise);
  return loading ? (
    <Spin className="center container " />
  ) : (
    <div> {enterprise.name} </div>
  );
}

export default Enterprise;
