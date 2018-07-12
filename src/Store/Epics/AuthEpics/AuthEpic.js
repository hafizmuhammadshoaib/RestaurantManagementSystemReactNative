import actionTypes from '../../actionTypes';
import Firebase from 'react-native-firebase';
import { Observable } from 'rxjs';
import Auth from '../../Firebase/FirebaseAuth';
import AuthActions from '../../Actions/AuthActions/AuthActions';

const fire = Firebase.auth();

export default class AuthEpic {
    static signinUserEpic(action$) {
        return action$.ofType(actionTypes.LOGIN_REQUEST).switchMap(({payload}) => {
            return Observable.fromPromise(Auth.loginUser(payload))
                .map(user => {
                    return {
                        type: actionTypes.LOGIN_REQUEST_SUCCEED,
                        payload: user
                    }
                })
                .catch(err => {
                    return Observable.of(AuthActions.authError(err.message))
                })
        })
    }

    static signupUserEpic(action$) {
        return action$.ofType(actionTypes.SIGNUP_REQUEST).switchMap(({payload}) => {
            return Observable.fromPromise(Auth.createUser(payload))
                .map((userObj) => {
                    return Observable.fromPromise(fire.updateProfile({ displayName: payload.name }))
                        .map(() => {
                            return {
                                type: actionTypes.SIGNUP_REQUEST_SUCCEED,
                                payload: userObj
                            }
                        })
                })
                .catch(err => {
                    return Observable.of(AuthActions.authError(err.message))
                })
        })
    }

    static chekUser(action$) {
        return action$.ofType(actionTypes.CHEK_USER)
    
            .switchMap(() => {
                console.log("*******","user")
                return Observable.fromPromise(new Promise((res, rej)=>{
                    fire.onAuthStateChanged(user=>{
                        if(user){
                            res(user);
                        }else{
                            res(null);
                        }
                    })
                }))
                    .map(user => {
                        return {
                            type: actionTypes.IS_USER_FOUND,
                            payload: user
                        }
                    })
            })
    }

    
}