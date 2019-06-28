import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="container">
      <table className="authTable table">
        <tbody>
          <tr>
            <td>
              <div>
                <Link to="/login/student">
                  <img
                    id="imgAuth"
                    src="https://stages.polytech.upmc.fr/sites/all/themes/smartenko/cdn/images/stage.png"
                    alt=""
                  />
                </Link>
                <div className="acces_connexion">
                  <h4>
                    <span id="authTitle">Accès Elèves</span>
                  </h4>
                </div>
              </div>
            </td>

            <td>
              <div>
                <Link to="/login/administration">
                  <img
                    id="imgAuth"
                    src="https://stages.polytech.upmc.fr/sites/all/themes/smartenko/cdn/images/admin.png"
                    alt=""
                  />
                </Link>
                <div className="acces_connexion">
                  <h4>
                    <span id="authTitle">Accès Administration</span>
                  </h4>
                </div>
              </div>
            </td>

            <td>
              <div>
                <Link to="/login/enterprise">
                  <img
                    id="imgAuth"
                    src="https://stages.polytech.upmc.fr/sites/all/themes/smartenko/cdn/images/admin.png"
                    alt=""
                  />
                </Link>
                <div className="acces_connexion">
                  <h4>
                    <span id="authTitle">Accès Entreprise</span>
                  </h4>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Menu;
