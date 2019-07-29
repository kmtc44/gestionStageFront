import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import axios from "axios";
import { Spin, Modal } from "antd";
import { Link } from "react-router-dom";
import "../../assets/css/login.css";
import {
  Button,
  Card,
  CardGroup,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Col
} from "reactstrap";
import { baseSite } from '../../config'
import NotificationAlert from "react-notification-alert";
import { connect } from 'react-redux'

const { confirm } = Modal;
function ListConvention(props) {
  const [conventions, setConvention] = useState([]);
  const [loading, setLoading] = useState(false);
  const notificationAlert = useRef(null)

  function showConfirmDelete(e) {
    const info = e.target.value.split(",");
    const id_convention = info[0];
    const name = info[1];
    const enterprise_name = info[2]


    confirm({
      title: `Voulez vous vraiment supprimer cette convention avec l'entreprise ${enterprise_name} ?`,
      content: `Convention : ${name}`,
      onOk() {
        const user = JSON.parse(localStorage.getItem("user"));
        axios.defaults.headers = {
          "Content-Type": "Application/json",
          Authorization: `Token ${user.token}`
        };
        axios
          .put(`${baseSite}/internship/convention/${id_convention}/`, {
            is_deleted: true
          })
          .then(res => {
            notify(
              "tc",
              `La convention ${res.data.name} est supprimer avec succes`,
              "success"
            );
            props.history.push('/dashboard')

          })
          .catch(err => console.log(err));
      },
      onCancel() { }
    });
  }

  const notify = (place, message, type) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7
    };

    notificationAlert.current.notificationAlert(options);
  }


  useEffect(() => {
    const fetchConvention = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers = {
        "Content-Type": "Application/json",
        Authorization: `Token ${user.token}`
      };
      const res = await axios(`${baseSite}/internship/convention/`);
      setConvention(res.data.filter(convention => !convention.is_deleted));
      setLoading(false);
    };

    fetchConvention();
  }, []);

  return loading ? (
    <Spin className="center container" />
  ) : (
      <div className="container">
        <NotificationAlert ref={notificationAlert} />
        <CardGroup className="mx-auto cardHolder">
          {conventions.map((convention) => {
            return (
              <Col md="4" lg="3" sm="4" key={convention.id}>
                <Link to={`/dashboard/convention/detail/${convention.id}`}>
                  <Card className="m-1" >
                    {convention.enterprise.logo ? (
                      <CardImg
                        className="img-student-enterprise"
                        top
                        src={convention.enterprise.logo}
                        alt="Card image cap"
                      />

                    ) : (

                        <CardImg
                          className="img-student-enterprise"
                          top
                          src={require("../../assets/img/convention.jpg")}
                          alt="Card image cap"
                        />

                      )}
                    <CardBody>
                      <CardTitle style={{ fontSize: 17, fontWeight: "bold" }}>
                        {convention.title}
                      </CardTitle>
                      <CardSubtitle style={{ fontSize: 15 }}>
                        Cooperation avec {convention.enterprise.name}
                      </CardSubtitle>
                      <CardText>
                        Le partenariat avec {convention.enterprise.name} a commence
                    le {moment.locale(convention.starting_date)}
                      </CardText>
                    </CardBody>
                  </Card>
                </Link>
                {
                  props.status === 'teacher' && props.is_responsible ? (
                    <Button
                      value={[
                        convention.id,
                        convention.name,
                        convention.enterprise.name
                      ]}
                      className="btn btn-danger"
                      onClick={showConfirmDelete}
                    >
                      Supprimer
                    </Button>
                  ) : ('')
                }
              </Col>
            );
          })}
        </CardGroup>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    status: state.status,
    is_responsible: state.is_responsible
  }
}
export default connect(mapStateToProps)(ListConvention);
