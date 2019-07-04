import React, { Component } from "react";
import "../../assets/css/footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <div>
          <section id="block-block-1">
            <p>
              Propulsé par
              <a
                href="http://www.ept.sn"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                le département G.I.T. de l'E.P.T.
              </a>
            </p>
          </section>
        </div>
      </footer>
    );
  }
}

export default Footer;
