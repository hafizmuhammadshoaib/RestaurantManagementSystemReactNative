import actionTypes from '../actionTypes';

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: "",
    user: null
}

export default function authReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case actionTypes.LOGIN_REQUEST:
            return Object.assign({}, state, {isProgress: true});

        case actionTypes.LOGIN_REQUEST_SUCCEED:
            return Object.assign({}, state, {isProgress: false, user: action.payload});

        case actionTypes.SIGNUP_REQUEST:
            return Object.assign({}, state, {isProgress: true});

        case actionTypes.SIGNUP_REQUEST_SUCCEED:
            return Object.assign({}, state, {isProgress: false, user: action.payload});

        case actionTypes.AUTH_ERROR:
            return Object.assign({}, state, {isError: true, errorText: action.payload});

        case actionTypes.SET_ERROR_FALSE:
            return Object.assign({}, state, {isError: false});

        case actionTypes.IS_USER_FOUND:
            return Object.assign({}, state, {user: action.payload});

        default:
            return state;
    }
}