import axios from "axios";

const GET_EXPENSES = "GET_EXPENSES";
const GET_EXPENSES_BY_CAT = "GET_EXPENSES_BY_CAT";
const GET_TOP_EXPENSES = "GET_TOP_EXPENSES";
const GET_EXPENSES_BY_MONTH = "GET_EXPENSES_BY_MONTH";
const ADD_EXPENSE = "ADD_EXPENSE";
const DELETE_EXPENSE = "DELETE_EXPENSE";
const GET_GOAL = "GET_GOAL";

export function getExpenseTotalsByMonth() {
  return {
    type: "GET_EXPENSES_BY_MONTH",
    payload: axios.get(`/api/linechart`)
  };
}

export function getExpenses() {
  return {
    type: GET_EXPENSES,
    payload: axios.get(`/api/expenses`)
  };
}

export function getExpensesByCategory() {
  return {
    type: GET_EXPENSES_BY_CAT,
    payload: axios.get(`/api/expenses_by_cat`)
  };
}

export const getTopExpenses = (start, end) => {
  return {
    type: GET_TOP_EXPENSES,
    payload: axios.get(`/api/top-expenses/?start=${start}&end=${end}`)
  };
};

export function getYearlyExpensesByCategory() {
  return {
    type: GET_EXPENSES_BY_CAT,
    payload: axios.get(`/api/yearly-expenses_by_cat`)
  };
}

export function addExpenses(newExpense) {
  return {
    type: ADD_EXPENSE,
    payload: axios.post("/api/add-expenses", newExpense)
  };
}

export function deleteExpense(expense) {
  return {
    type: DELETE_EXPENSE,
    payload: axios.delete(`/api/delete-expense/${expense.id}`)
  };
}

export function getGoals() {
  return {
    type: GET_GOAL,
    payload: axios.get(`/api/goal`)
  };
}

const initialState = {
  expense: [],
  goals: [],
  expensesbycat: [],
  expensesbymonth: [],
  topExpenses: [],
  didErr: false
};

export default function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_EXPENSES}_FULFILLED`:
    case `${ADD_EXPENSE}_FULFILLED`:
    case `${DELETE_EXPENSE}_FULFILLED`:
      return {
        ...state,
        expense: action.payload.data
      };
    case `${GET_GOAL}_FULFILLED`:
      return {
        ...state,
        goals: action.payload.data
      };
    case `${GET_EXPENSES_BY_CAT}_FULFILLED`:
      return {
        ...state,
        expensesbycat: action.payload.data
      };
    case `${GET_TOP_EXPENSES}_FULFILLED`:
      return {
        ...state,
        topExpenses: action.payload.data
      };
    case `${GET_EXPENSES_BY_MONTH}_FULFILLED`:
      return {
        ...state,
        expensesbymonth: action.payload.data
      };
    case `${GET_EXPENSES}_REJECTED`:
    case `${ADD_EXPENSE}_REJECTED`:
    case `${GET_EXPENSES_BY_CAT}_REJECTED`:
    case `${DELETE_EXPENSE}_REJECTED`:
      return {
        ...state,
        didErr: true
      };
    case `${GET_GOAL}_REJECTED`:
      return {
        ...state,
        didErr: true
      };
    default:
      return state;
  }
}
