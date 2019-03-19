import {
  ALL_POLISHES,
  START_API_CALL,
  GET_LIST_CONTENT
 } from '../actions/constants';

const INITIAL_STATE = {
  loadingPolish: false,
  allPolishes: [],
  curPolishes: []
};

export default (state = INITIAL_STATE, action) => {
  const info = action.payload;
  switch (action.type) {
    case START_API_CALL:
      return { ...state, loadingPolish: true };
    case GET_LIST_CONTENT:
      return { ...state, curPolishes: info, loadingPolish: false };
    case ALL_POLISHES:
      return { ...state, allPolishes: info, loadingPolish: false };
    default:
      return state;
 }
};
