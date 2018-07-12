import actionTypes from '../../actionTypes';

export default class DBActions{
    static loadTables(){
        return{
            type: actionTypes.LOAD_ALL_TABLES
        }
    }

    static loadTablesError(err){
        return{
            type: actionTypes.LOAD_ALL_TABLES_ERROR,
            payload: err
        }
    }

    static setErrorTrue(){
        return{
            type: action
        }
    }
}