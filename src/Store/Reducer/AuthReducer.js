import actionTypes from '../actionTypes';

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: "",
    user: {}
}

export default function authReducer(state = INITIAL_STATE, action){
    switch(action){
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

        default:
            return state;
    }
}