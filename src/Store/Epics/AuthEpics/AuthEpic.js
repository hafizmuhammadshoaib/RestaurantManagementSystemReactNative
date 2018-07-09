import actionTypes from '../../actionTypes';
import Firebase from 'react-native-firebase';
import { Observable } from 'rxjs';
import Auth from '../../Firebase/FirebaseAuth';
import AuthActions from '../../Actions/AuthActions/AuthActions';

const fire = Firebase.auth();

export default class AuthEpic {
    static signinUserEpic(action$) {
        return action$.ofType(actionTypes.LOGIN_REQUEST).switchMap(({payload}) => {
            return Observable.fromPromise(Auth.loginUser(payload)
                .map(user => {
                    return {
                        type: actionTypes.LOGIN_REQUEST_SUCCEED,
                        payload
                    }
                })
                .catch(err => {
                    return Observable.of(AuthActions.authError(err.message))
                }))
        })
    }

    static signupUserEpic(action$) {
        return action$.ofType(actionTypes.SIGNUP_REQUEST).switchMap(({payload}) => {
            return Observable.fromPromise(Auth.createUser(payload)
                .map((userObj) => {
                    return Observable.fromPromise(fire.updateProfile({ displayName: payload.name })
                        .map(() => {
                            return {
                                type: actionTypes.SIGNUP_REQUEST_SUCCEED,
                                payload: userObj
                            }
                        })
                    )
                    // return{
                    //     type: actionTypes.UPDATE_USER,
                    //     payload
                    // }
                })
                .catch(err => {
                    return Observable.of(AuthActions.authError(err.message))
                })
            )
        })
    }

    // static updateUser(action$){
    //     return action$.ofType(actionTypes.UPDATE_USER)
    //             .switchMap(({payload})=>{
    //                 return Observable.fromPromise(Auth.updateUser())
    //             })
    // }
}