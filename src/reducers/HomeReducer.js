import {
  START_API_CALL,
  GET_LISTS,
  LISTNAME_CHANGED,
  LIST_CREATED,
  CLEAR_LISTNAME,
  OPEN_MODAL,
  CLOSE_MODAL
 } from '../actions/constants';

const INITIAL_STATE = {
  loadingLists: false,
  userLists: [],
  listname: '',
  showModal: false
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
    case CLEAR_LISTNAME:
      return { ...state, listname: '' };
    case OPEN_MODAL:
      return { ...state, showModal: true, loadingLists: true };
    case CLOSE_MODAL:
      return { ...state, showModal: false, loadingLists: false };
    default:
      return state;
 }
};
