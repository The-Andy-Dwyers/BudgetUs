import axios from "axios";

const initialState = {
  income: [],
  amount: "",
  date: "",
  source: "",
  didErr: false,
  dashboard: []
};

const GET_AMOUNT = "GET_AMOUNT";
const GET_DATE = "GET_DATE";
const GET_TITLE = "GET_TITLE";

const GET_DASHBOARD = "GET_DASHBOARD";
export const getDashboard = view => {
  return {
    type: GET_DASHBOARD,
    payload: axios.get(`/api/dashboard?view=${view}`)
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
    case `${GET_DASHBOARD}_FULFILLED`:
      return {
        ...state,
        dashboard: action.payload.data
      };
    case `${GET_DASHBOARD}_REJECTED`:
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
        source: action.payload
      };
    default:
      return state;
  }
}
