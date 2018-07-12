import actionTypes from '../../actionTypes';
import Firebase from 'react-native-firebase';
import { Observable } from 'rxjs';
import FirebaseDB from '../../Firebase/firebaseDB';
import DBActions from '../../Actions/DBActions/DBActions';

const fire = Firebase.auth();

export default class DBEpic {
    static loadTables(action$){
        return action$.ofType(actionTypes.LOAD_ALL_TABLES)
                .switchMap(()=>{
                    return Observable.fromPromise(FirebaseDB.getTables())
                            .map(obj=>{
                                console.log("Obj: ", obj);
                                return{
                                    type: actionTypes.LOAD_ALL_TABLES_SUCCESS,
                                    payload: obj
                                }
                            })
                            .catch(err=>{
                                return Observable.of(DBActions.loadTablesError(err.message));
                            })
                })
    }
}