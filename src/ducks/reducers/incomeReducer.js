import axios from "axios";

const initialState = {
  income: {},
  amount: '',
  name: '',
  didErr: false
};

<<<<<<< HEAD
const GET_INCOME = "GET_INCOME";
=======
const GET_INCOME = 'GET_INCOME';
const GET_AMOUNT = 'GET_AMOUNT';
const GET_NAME = 'GET_NAME';
>>>>>>> master

export const getIncome = () => {
  return {
    type: GET_INCOME,
    payload: axios.get("/api/income")
  };
};

export const updateAmount = amount => {
  return {
    type: GET_AMOUNT,
    payload: amount
  };
};

export const updateName = name => {
  return {
    type: GET_NAME,
    payload: name
  };
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_INCOME}_FULFILLED`:
      return {
        ...state,
        income: action.payload.data
      };
    case `${GET_INCOME}_REJECTED`:
      return {
        ...state,
        didErr: true
      };
    case GET_AMOUNT:
      return {
        ...state,
        amount: action.payload
      };
    case GET_NAME:
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
}
