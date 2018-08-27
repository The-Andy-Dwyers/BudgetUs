import axios from "axios";

const GET_EXPENSES = "GET_EXPENSES";
const GET_EXPENSES_BY_CAT = "GET_EXPENSES_BY_CAT";
const ADD_EXPENSE = "ADD_EXPENSE";

export function getExpenses() {
  return {
    type: "GET_EXPENSES",
    payload: axios.get("/api/expenses")
  };
}
export function getExpensesByCategory() {
  return {
    type: "GET_EXPENSES_BY_CAT",
    payload: axios.get("/api/expenses_by_cat")
  };
}

export function addExpenses(newExpense) {
  return {
    type: "ADD_EXPENSE",
    payload: axios.post("/api/add-expenses", newExpense)
  };
}

const initialState = {
  expense: [],
  expensesbycat: [],
  didErr: false
};

export default function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_EXPENSES}_FULFILLED`:
    case `${ADD_EXPENSE}_FULFILLED`:
      return { ...state, expense: action.payload.data };
    case `${GET_EXPENSES_BY_CAT}_FULFILLED`:
      return { ...state, expensesbycat: action.payload.data };
    case `${GET_EXPENSES}_REJECTED`:
    case `${ADD_EXPENSE}_REJECTED`:
    case `${GET_EXPENSES_BY_CAT}_REJECTED`:
      return { ...state, didErr: true };
    default:
      return state;
  }
}
