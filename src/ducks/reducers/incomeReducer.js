import axios from 'axios';

const initialState = {
  income: [],
  amount: '',
  date: '',
  title: '',
  didErr: false,
  events: [],
  dashboard: [],
  sources: [],
  months: []
};

const GET_AMOUNT = 'GET_AMOUNT';
const GET_DATE = 'GET_DATE';
const GET_TITLE = 'GET_TITLE';
const RESET = 'RESET';
const GET_DASHBOARD = 'GET_DASHBOARD';
const GET_INCOME_EVENTS = 'GET_INCOME_EVENTS';
const GET_INCOME = 'GET_INCOME';

export const getDashboard = (start, end) => {
  return {
    type: GET_DASHBOARD,
    payload: axios.get(`/api/dashboard?start=${start}&end=${end}`)
  };
};

export const getIncomeEvents = () => {
  return {
    type: GET_INCOME_EVENTS,
    payload: axios.get(`/api/dashboard?view=year`)
  };
};

export const getIncome = id => {
  return {
    type: GET_INCOME,
    payload: axios.get(`/api/income/${id}`)
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

export const reset = () => {
  return {
    type: RESET,
    payload: ''
  };
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_DASHBOARD}_FULFILLED`:
      return {
        ...state,
        dashboard: action.payload.data,
        sources: action.payload.data.sources,
        months: action.payload.data.months
      };
    case `${GET_INCOME_EVENTS}_FULFILLED`:
      return {
        ...state,
        events: action.payload.data.sources
      };
      case `${GET_INCOME}_FULFILLED`:
      return {
        ...state,
        income: action.payload.data
      };
    case `${GET_DASHBOARD}_REJECTED`:  
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
    case RESET:
      return {
        ...state,
        amount: action.payload,
        date: action.payload,
        title: action.payload
      };
    default:
      return state;
  }
}
