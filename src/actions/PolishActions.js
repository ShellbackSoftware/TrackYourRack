import {
  SITE_BASE,
  ALL_POLISHES,
  START_API_CALL,
  GET_LIST_CONTENT,
  CLEAR_POLISH_STATE,
  FINISH_POLISH_LIST
} from './constants';

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
