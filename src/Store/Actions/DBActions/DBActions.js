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
    static loadMenu(){
        return{
            type:actionTypes.LOAD_MENU_PROGRESS
        }
    }
    static loadMenuError(msg){
        return{
            type:actionTypes.LOAD_MENU_ERROR,
            payload:msg
        }
    }
}