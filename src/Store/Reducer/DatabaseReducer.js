import actionTypes from '../actionTypes';

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: "",
    tables: null,
    menu: [],
    tableID: '',
    orderID: ''
}

export default function dbReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.LOAD_ALL_TABLES:
            return Object.assign({}, state, { isProgress: true });

        case actionTypes.LOAD_ALL_TABLES_SUCCESS:
            return Object.assign({}, state, { isProgress: false, tables: action.payload });

        case actionTypes.LOAD_ALL_TABLES_ERROR:
            return Object.assign({}, state, { isError: true, errorText: action.payload });

        case actionTypes.LOAD_ALL_TABLES_ERROR_TRUE:
            return Object.assign({}, state, { isError: true });


        case actionTypes.LOAD_MENU_PROGRESS:
            return Object.assign({}, state, { isProgress: true })
        case actionTypes.LOAD_MENU_SUCCESS:
            return Object.assign({}, state, { isProgress: false, menu: action.payload })
        case actionTypes.LOAD_MENU_ERROR:
            return Object.assign({}, state, { isProgress: false, isError: true, errorText: action.payload })


        case actionTypes.SET_TABLE_ID:
            return Object.assign({}, state, { tableID: action.payload })
        case actionTypes.SET_ORDER_ID:
            return Object.assign({}, state, { orderID: action.payload })
        default:
            return state;
    }
}