import axios from 'axios';

const initialState = {
  income: {},
  didErr: false
};

const GET_INCOME = 'GET_INCOME';

export const getIncome = () => {
  return {
    type: GET_INCOME,
    payload: axios.get('/api/income')
  };
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_INCOME}_FULFILLED`:
      return {
        ...state,
        incom: action.payload.data
      };
    case `${GET_INCOME}_REJECTED`:
      return {
        ...state,
        didErr: true
      };
    default:
      return state;
  }
}
