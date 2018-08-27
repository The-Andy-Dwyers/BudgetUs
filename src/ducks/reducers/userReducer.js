import axios from 'axios';

const initialState = {
  user: {},
  users: {},
  didErr: false
};

const GET_USER = 'GET_USER';
const GET_USERS = 'GET_USERS';

export const getUser = () => {
  return {
    type: GET_USER,
    payload: axios.get('/api/me')
  };
};

export const getUsers = () => {
  return {
    type: GET_USERS,
    payload: axios.get('/api/users')
  };
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        ...action.payload.data
      };
    case `${GET_USERS}_FULFILLED`:
      return {
        ...state,
        users: action.payload.data
      };
    case `${GET_USER}_REJECTED`:
    case `${GET_USERS}_REJECTED`:
      return {
        ...state,
        didErr: true
      };
    default:
      return state;
  }
}
