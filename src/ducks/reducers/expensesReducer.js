import axios from 'axios'

const GET_EXPENSES = 'GET_EXPENSES'
const ADD_EXPENSE = 'ADD_EXPENSE'

export function getExpenses() {
    return {
        type: 'GET_EXPENSES',
        payload: axios.get('/api/expenses')
    }
}

export function addExpenses(newExpense) {
    return {
        type: 'ADD_EXOENSE',
        payload: axios.post('/api/addExpense', newExpense)
    }
}

const initialState = {
    expense: []
}

export default function expensesReducer(state = initialState, action) {
    switch (action.type) {
        case ``
    }
}