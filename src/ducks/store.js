import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import userReducer from './reducers/userReducer';
import expensesReducer from './reducers/expensesReducer';
import incomeReducer from './reducers/incomeReducer';

const combinedReducers = combineReducers({
    userReducer, expensesReducer, incomeReducer
});

const middlewares = applyMiddleware(promiseMiddleware());

const store = createStore(combinedReducers, middlewares);

export default store;
