import actionTypes from '../actionTypes';
import { startWith } from 'rxjs/operator/startWith';

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: "",
    tables: null,
    menu:[]
}

export default function dbReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.LOAD_ALL_TABLES:
            return Object.assign({}, state, { isProgress: true });

        case actionTypes.LOAD_ALL_TABLES_SUCCESS:
            return Object.assign({}, state, { isProgress: false, tables: action.payload });

        case actionTypes.LOAD_ALL_TABLES_ERROR:
            return Object.assign({}, state, {isError:true, errorText: action.payload});

        case actionTypes.LOAD_ALL_TABLES_ERROR_TRUE:
            return Object.assign({}, state, {isError: true});


        case actionTypes.LOAD_MENU_PROGRESS:
        return Object.assign({},state,{isProgress:true})
        case actionTypes.LOAD_MENU_SUCCESS:
        return Object.assign({},state,{isProgress:false,menu:action.payload})
        case actionTypes.LOAD_MENU_ERROR:
        return Object.assign({},state,{isProgress:false,isError:true,errorText:action.payload})

        case actionTypes.PUSH_ORDER_PROGRESS:
        return Object.assign({},state,{isProgress:true})
        case actionTypes.PUSH_ORDER_SUCCESS:
        return Object.assign({},state,{isProgress:false})
        case actionTypes.PUSH_ORDER_ERROR:
        return Object.assign({},state,{isProgress:false,isError:true,errorText:action.payload})
        
        default:
            return state;
    }
}