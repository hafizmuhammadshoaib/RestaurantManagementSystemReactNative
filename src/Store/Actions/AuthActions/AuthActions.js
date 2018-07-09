import actionTypes from '../../actionTypes';

export default class AuthActions{
    static signinUser(data){
        return{
            type: actionTypes.LOGIN_REQUEST,
            payload: data
        }
    }
    

    static signupUser(data){
        return{
            type: actionTypes.SIGNUP_REQUEST,
            payload: data
        }
    }

    static authError(data){
        return{
            type: actionTypes.AUTH_ERROR,
            payload: data
        }
    }
}