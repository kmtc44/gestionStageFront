import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Spin } from "antd";

const baseSite = "http://localhost:8000";
function ListConvention(props) {
  const [conventions, setConvention] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConvention = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "Application/json",
        Authorization: `Token ${user.token}`
      };
      const res = await axios(`${baseSite}/conventions`);
      setConvention(res.data);
      setLoading(false);
    };

    fetchConvention();
  }, []);

  return <p />;
}
