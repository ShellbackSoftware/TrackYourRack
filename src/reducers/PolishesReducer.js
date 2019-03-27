import {
  ALL_POLISHES,
  START_API_CALL,
  GET_LIST_CONTENT,
  CLEAR_POLISH_STATE,
  SEARCH_TERM_CHANGED,
  SET_EDIT_MODE,
  CLEAR_EDIT_MODE,
  FINISH_API_CALL,
  ADD_SEL_POLISH,
  REM_SEL_POLISH
 } from '../actions/constants';

const INITIAL_STATE = {
  loadingPolish: true,
  allPolishes: [],
  curPolishes: [],
  searchTerm: '',
  editMode: false,
  selectedPolishes: []
};

export default (state = INITIAL_STATE, action) => {
  const info = action.payload;
  switch (action.type) {
    case START_API_CALL:
      return { ...state, loadingPolish: true };
    case FINISH_API_CALL:
      return { ...state, loadingPolish: false };
    case GET_LIST_CONTENT:
      return { ...state, curPolishes: info, loadingPolish: false };
    case ALL_POLISHES:
      return { ...state, allPolishes: info, loadingPolish: false };
    case CLEAR_POLISH_STATE:
      return { ...state, curPolishes: [] };
    case SEARCH_TERM_CHANGED:
      return { ...state, searchTerm: info };
    case SET_EDIT_MODE:
      return { ...state, editMode: true };
    case CLEAR_EDIT_MODE:
      return { ...state, editMode: false };
    case ADD_SEL_POLISH:
      return { ...state, selectedPolishes: [...state.selectedPolishes, info] };
    case REM_SEL_POLISH:
      return {
        ...state,
        selectedPolishes: state.selectedPolishes.filter(
          (p) => p !== info)
          };
    default:
      return state;
 }
};
