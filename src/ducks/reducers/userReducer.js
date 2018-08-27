import axios from 'axios';

const initialState = {
  users: {},
  didErr: false
};

const GET_USERS = 'GET_USERS';

export const getUsers = () => {
  return {
    type: GET_USERS,
    payload: axios.get('/api/users')
  };
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USERS}_FULFILLED`:
      return {
        ...state,
        users: action.payload.data
      };
    case `${GET_USERS}_REJECTED`:
      return {
        ...state,
        didErr: true
      };
    default:
      return state;
  }
}
