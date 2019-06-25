import React, { Component } from "react";
import "../styles/footer.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer class="footer container">
        <div class="region region-footer">
          <section id="block-block-1" class="block block-block clearfix">
            <p>
              Propulsé par
              <a href="http://www.ept.sn" target="_blank">
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
