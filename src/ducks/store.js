import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import userReducer from './reducers/userReducer';

// const combinedReducers = combineReducers({

// });

const middlewares = applyMiddleware(promiseMiddleware());

const store = createStore(userReducer, middlewares);

export default store;
