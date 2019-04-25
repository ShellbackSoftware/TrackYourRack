import _ from 'lodash';
import {
  SITE_BASE,
  ALL_POLISHES,
  START_API_CALL,
  GET_LIST_CONTENT,
  CLEAR_POLISH_STATE,
  SEARCH_TERM_CHANGED,
  SET_EDIT_MODE,
  CLEAR_EDIT_MODE,
  FINISH_API_CALL,
  ADD_SEL_POLISH,
  REM_SEL_POLISH,
  CLEAR_SEARCH_TERM,
  SET_BRANDS,
  SET_LIST_NAME
} from './constants';

export const setListName = (listname) => {
  return (dispatch) => {
    dispatch({ type: SET_LIST_NAME, payload: listname });
  };
};

export const clearSearchTerm = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_SEARCH_TERM });
  };
};

export const searchtermChanged = (text) => {
  return {
      type: SEARCH_TERM_CHANGED,
      payload: text
  };
};

// Returns polish objects
export const getAllPolishes = () => {
  return (dispatch) => {
    dispatch({ type: START_API_CALL });

    fetch(`${SITE_BASE}/api/polish?_format=json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(resData => {
      // Set list of brands (used in autocomplete)
      dispatch({
        type: SET_BRANDS,
        payload: _.uniq(_.map(resData, 'pBrand'))
      });
      dispatch({
        type: ALL_POLISHES,
        payload: resData
      });
    });
  };
};

// Returns list of pID's in the list
export const getPolishList = (listid) => {
  return (dispatch) => {
    dispatch({ type: START_API_CALL });

    return fetch(`${SITE_BASE}/api/lists/content/${listid}?_format=json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(resData => {
      dispatch({
        type: GET_LIST_CONTENT,
        payload: resData
      });
      return Promise.resolve();
    });
  };
};

export const finishPolishList = () => {
  return (dispatch) => {
    dispatch({ type: FINISH_API_CALL });
  };
};


export const clearPolishState = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_POLISH_STATE });
  };
};

export const setEditMode = () => {
  return (dispatch) => {
    dispatch({ type: SET_EDIT_MODE });
  };
};

export const clearEditMode = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_EDIT_MODE });
  };
};

export const addSelPolish = (pID) => {
 return (dispatch) => {
    dispatch({
      type: ADD_SEL_POLISH,
      payload: pID
    });
  };
};

export const remSelPolish = (pID) => {
  return (dispatch) => {
     dispatch({
       type: REM_SEL_POLISH,
       payload: pID
     });
   };
 };

export const addPolishToList = (uid, listid, pID) => {
  return (dispatch) => {
    dispatch({ type: START_API_CALL });

    return fetch(`${SITE_BASE}/api/lists/content/${listid}?_format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        pID
      })
    })
    .then(() => {
      dispatch({ type: FINISH_API_CALL });
      dispatch({ type: CLEAR_EDIT_MODE });
    });
  };
};

export const removePolishFromList = (uid, listid, pID) => {
  return (dispatch) => {
    dispatch({ type: START_API_CALL });

    return fetch(`${SITE_BASE}/api/lists/content/${listid}?_format=json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        pID
      })
    })
    .then(() => {
      dispatch({ type: CLEAR_POLISH_STATE });
      dispatch({ type: FINISH_API_CALL });
    });
  };
};
