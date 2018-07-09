import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import {createLogger} from 'redux-logger';
// reducers
import authReducer from './Reducer/AuthReducer';

// epics

import AuthEpic from './Epics/AuthEpics/AuthEpic';

// const persistedState = loadState();
const loggerMiddleware = createLogger();
// Application Reducers
const rootReducer = combineReducers({
  authReducer

});

export const rootEpic = combineEpics(
    AuthEpic
  // more epics functions go here
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware,loggerMiddleware);

export let store = createStore(
  rootReducer,
  createStoreWithMiddleware,
);
store.subscribe(() => {
  // saveState(store.getState());
});
