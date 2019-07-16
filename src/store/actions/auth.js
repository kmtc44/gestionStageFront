import axios from "axios";
import * as actionType from "./actionsType";

export const authStart = () => {
  return {
    type: actionType.AUTH_START
  };
};
export const authSuccess = user => {
  return {
    type: actionType.AUTH_SUCCESS,
    user
  };
};

export const authFail = error => {
  return {
    type: actionType.AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => {
  // const user = JSON.parse(localStorage.getItem('user'))
  localStorage.removeItem("user");
  // axios.defaults.headers = {
  //   "Authorization": `Token ${user.token}`
  // }
  // axios.post("http://localhost:8000/auth/logout")
  //   .then(res => {
  return {
    type: actionType.AUTH_LOGOUT
  };
  // })
  // .catch(err => console.log(err))
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password, status) => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post("http://localhost:8000/auth/login", {
        username: username,
        password: password
      })
      .then(res => {
        let status_user = null
        let status_id = null
        let enterpriseId = null

        if (res.data.user.teacher !== null) {
          status_user = res.data.user.teacher.status
          status_id = res.data.user.teacher.id

        } else if (res.data.user.framer !== null) {
          status_user = res.data.user.framer.status
          status_id = res.data.user.framer.id
          enterpriseId = res.data.user.framer.enterprise

        } else if (res.data.user.student !== null) {
          status_user = res.data.user.student.status
          status_id = res.data.user.student.id
        }
        if (status !== status_user) {
          dispatch(authFail("Vous n'avez pas les droits acces dans cette espace"))
        } else {
          const user = {
            username: res.data.user.username,
            token: res.data.token,
            expirationDate: new Date(new Date().getTime() + 3600 * 1000),
            status: status_user,
            statusId: status_id,
            enterpriseId
          }
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(user));
          dispatch(checkAuthTimeout(3600))
        }
      })
      .catch(err => {
        console.log("il ya erreur")
        dispatch(authFail("Le nom utilisateur ou mot de passe pas valide"));
      });
  };
};

export const authRegisterStudent = (username, email, password, status, firstname, lastname, phone, department, classe, promotion, birthday) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://localhost:8000/auth/register", {
        username: username,
        email: email,
        password: password,
        status: status,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        department: department,
        classe: classe,
        promotion: promotion,
        birthday
      })
      .then(res => {
        const user = {
          username: res.data.user.username,
          token: res.data.token,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000),
          status,
          statusId: res.data.user.student.id
        }
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail("Nom utilisateur ou email deja pris"));
      });
  };
};

export const authRegisterAdministration = (username, email, password, status, firstname, lastname, phone, department) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://localhost:8000/auth/register", {
        username,
        email,
        password,
        status,
        firstname,
        lastname,
        phone,
        department
      })
      .then(res => {
        const user = {
          username: res.data.user.username,
          token: res.data.token,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000),
          status,
          statusId: res.data.user.teacher.id
        }
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail("Nom utilisateur ou email deja pris"));
      });
  };
};
export const authRegisterEnterprise = (username, email, password, status, firstname, lastname, phone, enterprise) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://localhost:8000/auth/register", {
        username,
        email,
        password,
        status,
        firstname,
        lastname,
        phone,
        enterprise
      })
      .then(res => {
        const user = {
          username: res.data.user.username,
          token: res.data.token,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000),
          status,
          statusId: res.data.user.framer.id,
          enterpriseId: res.data.user.framer.enterprise
        }
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail("Nom utilisateur ou email deja pris"));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.token === undefined) {
        dispatch(authLogout());
      } else {
        const expirationDate = user.expirationDate;
        if (expirationDate <= new Date()) {
          dispatch(authLogout());
        } else {
          dispatch(authSuccess(user));
          dispatch(
            checkAuthTimeout(
              (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
            )
          );
        }
      }
    }
  };
};