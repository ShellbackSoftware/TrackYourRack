import {
  START_API_CALL,
  GET_LISTS,
  LISTNAME_CHANGED,
  LIST_CREATED,
  LIST_DELETED,
  CLEAR_LISTNAME,
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_SEL_LIST,
  REM_SEL_LIST,
  CLEAR_SEL_LISTS
 } from '../actions/constants';

const INITIAL_STATE = {
  loadingLists: false,
  userLists: [],
  listname: '',
  showModal: false,
  selectedLists: []
};

export default (state = INITIAL_STATE, action) => {
  const info = action.payload;
  switch (action.type) {
    case START_API_CALL:
      return { ...state, loadingLists: true };
    case GET_LISTS:
      return { ...state, userLists: info, loadingLists: false };
    case LISTNAME_CHANGED:
      return { ...state, listname: info };
    case LIST_CREATED:
      return { ...state, listname: '', loadingLists: false, showModal: false };
    case LIST_DELETED:
      return { ...state, loadingLists: false };
    case CLEAR_LISTNAME:
      return { ...state, listname: '' };
    case OPEN_MODAL:
      return { ...state, showModal: true, loadingLists: true };
    case CLOSE_MODAL:
      return { ...state, showModal: false, loadingLists: false };
    case CLEAR_SEL_LISTS:
      return { ...state, selectedLists: [] };
    case ADD_SEL_LIST:
      return { ...state, selectedLists: [...state.selectedLists, info] };
    case REM_SEL_LIST:
      return {
        ...state,
        selectedLists: state.selectedLists.filter(
          (list) => list !== info)
          };
    default:
      return state;
 }
};
