import React from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import axios from 'axios';
import { connect } from 'react-redux'
import PropTypes from "prop-types";

// reactstrap components
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

const baseSite = "http://localhost:8000";
const MapWrapper = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 14.7167, lng: -17.4677 }}
      defaultOptions={{
        scrollwheel: false,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }, { lightness: 17 }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }, { lightness: 18 }]
          },
          {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }, { lightness: 16 }]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#dedede" }, { lightness: 21 }]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              { visibility: "on" },
              { color: "#ffffff" },
              { lightness: 16 }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              { saturation: 36 },
              { color: "#333333" },
              { lightness: 40 }
            ]
          },
          { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{ color: "#fefefe" }, { lightness: 20 }]
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
          }
        ]
      }}
    >

      {
        props.enterprises ? (

          <>
            {
              props.enterprises.map(enterprise => {
                return (
                  <Marker position={{ lat: enterprise.latitude, lng: enterprise.longitude }} />
                )
              })
            }
          </>
        ) : (
            <Marker position={{ lat: props.enterprise.latitude, lng: props.enterprise.longitude }} />
          )
      }
    </GoogleMap>
  ))
)

class FullScreenMap extends React.Component {
  state = {
    enterprises: null,
    loading: false
  }

  componentDidMount() {
    axios.defaults.headers = {
      "Content-type": "Application/json",
      Authorization: `Token ${this.props.token}`
    }
    if (this.props.location) {
      this.setState({ loading: true })
      axios.get(`${baseSite}/internship/enterprise/partner`)
        .then(res => {
          this.setState({ enterprises: res.data.filter(enterprise => enterprise.latitude) })
          this.setState({ loading: false })
          console.log(this.state.enterprises)
        })
    }
  }
  render() {
    return (
      <>
        <div className="content mt-2">
          <Row>
            {
              this.state.loading ? ("") : (
                <Col xs={12}>
                  <Card>
                    <CardHeader>Google Maps</CardHeader>
                    <CardBody>
                      <div
                        id="map"
                        className="map"
                        style={{ position: "relative", overflow: "hidden" }}
                      >
                        {
                          this.state.enterprises ? (
                            <MapWrapper
                              enterprises={this.state.enterprises}
                              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7S_QRPczHscZUuaAvqp6FCXYkIz2YSQc"
                              loadingElement={<div style={{ height: `100%` }} />}
                              containerElement={<div style={{ height: `100%` }} />}
                              mapElement={<div style={{ height: `100%` }} />}
                            />
                          ) : ("")
                        }
                        {
                          this.props.enterprise ? (
                            <MapWrapper
                              enterprise={this.props.enterprise}
                              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7S_QRPczHscZUuaAvqp6FCXYkIz2YSQc"
                              loadingElement={<div style={{ height: `100%` }} />}
                              containerElement={<div style={{ height: `100%` }} />}
                              mapElement={<div style={{ height: `100%` }} />}
                            />
                          ) : ("")
                        }
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              )
            }
          </Row>
        </div>
      </>
    );
  }
}


FullScreenMap.propTypes = {
  enterprise: PropTypes.object
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(FullScreenMap);
