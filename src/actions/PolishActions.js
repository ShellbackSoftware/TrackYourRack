import {
  SITE_BASE,
  ALL_POLISHES,
  START_API_CALL,
  GET_LIST_CONTENT,
  CLEAR_POLISH_STATE,
  FINISH_POLISH_LIST,
  SEARCH_TERM_CHANGED,
  SET_EDIT_MODE,
  CLEAR_EDIT_MODE
} from './constants';

export const searchtermChanged = (text) => {
  return {
      type: SEARCH_TERM_CHANGED,
      payload: text
  };
};

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
      dispatch({
        type: ALL_POLISHES,
        payload: resData
      });
    });
  };
};

export const getPolishList = (listid) => {
  return (dispatch) => {
    dispatch({ type: START_API_CALL });

    fetch(`${SITE_BASE}/api/lists/content/${listid}?_format=json`, {
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
    });
  };
};

export const finishPolishList = () => {
  return (dispatch) => {
    dispatch({ type: FINISH_POLISH_LIST });
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
