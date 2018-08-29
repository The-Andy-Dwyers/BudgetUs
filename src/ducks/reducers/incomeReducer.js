import axios from 'axios';

const initialState = {
  income: [],
  amount: '',
  date: '',
  title: '',
  didErr: false
};

const GET_INCOME = 'GET_INCOME';
const GET_AMOUNT = 'GET_AMOUNT';
const GET_DATE = 'GET_DATE';
const GET_TITLE = 'GET_TITLE';

export const getIncome = (start, end) => {
  return {
    type: GET_INCOME,
    payload: axios.get(`/api/income`)
  };
};

export const getYearlyIncome = () => {
  return {
    type: GET_INCOME,
    payload: axios.get(`/api/yearly-income`)
  };
};

export const updateAmount = amount => {
  return {
    type: GET_AMOUNT,
    payload: amount
  };
};

export const updateDate = date => {
  return {
    type: GET_DATE,
    payload: date
  };
};

export const updateTitle = title => {
  return {
    type: GET_TITLE,
    payload: title
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
    case GET_DATE:
      return {
        ...state,
        date: action.payload
      };
    case GET_TITLE:
      return {
        ...state,
        title: action.payload
      };
    default:
      return state;
  }
}
