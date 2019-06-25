import React, { Component } from "react";
import "../styles/authentification.css";

class Authentification extends Component {
  state = {};
  render() {
    return (
      <table className="authTable">
        <tr>
          <td>
            <div>
              <a href="/#">
                <img
                  id="imgAuth"
                  src="https://stages.polytech.upmc.fr/sites/all/themes/smartenko/cdn/images/stage.png"
                />
              </a>
              <div className="acces_connexion">
                <h4>
                  <a id="authTitle">Accès Elèves</a>
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div>
              <a href="/#">
                <img
                  id="imgAuth"
                  src="https://stages.polytech.upmc.fr/sites/all/themes/smartenko/cdn/images/admin.png"
                />
              </a>
              <div className="acces_connexion">
                <h4>
                  <a id="authTitle">Accès Professeur</a>
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div>
              <a href="/#">
                <img
                  id="imgAuth"
                  src="https://stages.polytech.upmc.fr/sites/all/themes/smartenko/cdn/images/admin.png"
                />
              </a>
              <div className="acces_connexion">
                <h4>
                  <a id="authTitle">Accès Encadreur</a>
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div>
              <a href="/#">
                <img
                  id="imgAuth"
                  src="https://stages.polytech.upmc.fr/sites/all/themes/smartenko/cdn/images/admin.png"
                />
              </a>
              <div className="acces_connexion">
                <h4>
                  <a id="authTitle">Accès Secrétaire</a>
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div>
              <a href="/#">
                <img
                  id="imgAuthLast"
                  src="https://stages.polytech.upmc.fr/sites/all/themes/smartenko/cdn/images/stage.png"
                />
              </a>
              <div className="acces_connexion">
                <h4>
                  <a id="authTitle">Accès Responsable stage</a>
                </h4>
              </div>
            </div>
          </td>
        </tr>
      </table>
    );
  }
}

export default Authentification;
