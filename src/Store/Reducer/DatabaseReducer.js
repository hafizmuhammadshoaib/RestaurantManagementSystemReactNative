import actionTypes from '../actionTypes';

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorText: "",
    tables: null
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

        default:
            return state;
    }
}