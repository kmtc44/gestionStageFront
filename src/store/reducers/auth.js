import * as actionType from '../actions/actionsType'
import {
    updateObject
} from '../utility'

const initialState = {
    token: null,
    error: null,
    username: null,
    status: null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state, action) => {
    console.log("action en realite : ", action)
    return updateObject(state, {
        token: action.user.token,
        status: action.user.status,
        username: action.user.username,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        username: null,
        status: null,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START:
            console.log("auth start");
            return authStart(state, action)

        case actionType.AUTH_SUCCESS:
            console.log("auth succes");
            return authSuccess(state, action)

        case actionType.AUTH_FAIL:
            console.log("auth fail");
            return authFail(state, action)

        case actionType.AUTH_LOGOUT:
            console.log("auth logout");
            return authLogout(state, action)

        default:
            return state
    }
}

export default reducer