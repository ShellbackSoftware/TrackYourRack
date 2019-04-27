import NavigationService from '../components/helpers/NavigationService';
import {
  START_API_CALL,
  SELECT_LIST,
  GET_LISTS,
  SITE_BASE,
  LISTNAME_CHANGED,
  LIST_CREATED,
  LIST_DELETED,
  CLEAR_LISTNAME,
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_SEL_LIST,
  REM_SEL_LIST,
  CLEAR_SEL_LISTS
} from './constants';

export const selectList = (dispatch, listId) => {
  dispatch({
      type: SELECT_LIST,
      payload: listId
  });
  NavigationService.navigate('PolishList', { listId });
};


export const getUserLists = (uid) => {
  return (dispatch) => {
    dispatch({ type: START_API_CALL });

    fetch(`${SITE_BASE}/api/lists/${uid}?_format=json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(resData => {
      dispatch({
        type: GET_LISTS,
        payload: resData
      });
    });
  };
};

export const openModal = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL });
  };
};

export const closeModal = (route) => {
  return (dispatch) => {
    dispatch({ type: CLOSE_MODAL });
    NavigationService.navigate(route);
  };
};

export const clearListname = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_LISTNAME });
  };
};

export const listnameChanged = (text) => {
  return (dispatch) => {
    dispatch({
      type: LISTNAME_CHANGED,
      payload: text
    });
  };
};

export const createList = (uid, listname) => {
  return (dispatch) => {
    dispatch({ type: START_API_CALL });

    fetch(`${SITE_BASE}/api/lists/${uid}?_format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listname }),
    })
    .then(res => res.json())
    .then(() => {
      dispatch({
        type: LIST_CREATED
      });
    });
  };
};

export const deleteList = (uid, listid) => {
  return (dispatch) => {
    dispatch({ type: START_API_CALL });

    fetch(`${SITE_BASE}/api/lists/${uid}?_format=json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listID: listid }),
    })
    //.then(res => res.json())
    .then(() => {
      dispatch({
        type: LIST_DELETED
      });
      NavigationService.navigate('Home');
    });
  };
};

export const clearSelectedLists = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_SEL_LISTS });
  };
};

// Add / remove from selected custom lists
export const addSelList = (listid) => {
  return (dispatch) => {
     dispatch({
       type: ADD_SEL_LIST,
       payload: listid
     });
   };
 };

export const remSelList = (listid) => {
  return (dispatch) => {
    dispatch({
      type: REM_SEL_LIST,
      payload: listid
    });
  };
};
