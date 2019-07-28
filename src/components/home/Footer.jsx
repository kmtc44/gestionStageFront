import React, { Component } from "react";
import "../../assets/css/footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <div>
          <section id="block-block-1">
            <p>
              Ecole Polytechnique de Thies {" "}
              &copy; {1900 + new Date().getYear()}, Designed by{" "}
              KM-CMW
            </p>
          </section>
        </div>
      </footer>
    );
  }
}

export default Footer;
