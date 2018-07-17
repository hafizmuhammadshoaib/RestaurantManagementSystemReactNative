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


    static pushDoneOrder(orderObj,tableId){
        return{
            type: actionTypes.PUSH_ORDER_PROGRESS,
            payload: {orderObj,tableId}
        }
    }

    static setTableID(data){
        return{
            type: actionTypes.SET_TABLE_ID,
            payload: data
        }
    }

    static setOrderID(data){
        return{
            type: actionTypes.SET_ORDER_ID,
            payload: data
        }
    }
}