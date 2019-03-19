import {
  START_API_CALL,
  GET_LISTS
 } from '../actions/constants';

const INITIAL_STATE = {
  loadingLists: false,
  userLists: []
};

export default (state = INITIAL_STATE, action) => {
  const info = action.payload;
  switch (action.type) {
    case START_API_CALL:
      return { ...state, loadingLists: true };
    case GET_LISTS:
      return { ...state, userLists: info, loadingLists: false };
    default:
      return state;
 }
};
