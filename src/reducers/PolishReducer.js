import {
  ALL_POLISHES,
  START_API_CALL
 } from '../actions/constants';

const INITIAL_STATE = {
  loading: false,
  allPolishes: [],
  currentListPolishes: []
};

export default (state = INITIAL_STATE, action) => {
  const info = action.payload;
  switch (action.type) {
    case START_API_CALL:
      return { ...state, loading: true };
    case ALL_POLISHES:
      return { ...state, allPolishes: info, loading: false };
    default:
      return state;
 }
};
