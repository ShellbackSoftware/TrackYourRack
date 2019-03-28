import NavigationService from '../components/helpers/NavigationService';
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
  REM_SEL_POLISH
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

export const addPolishToList = (uid, listid, pID, route) => {
  return (dispatch) => {
    dispatch({ type: START_API_CALL });

    fetch(`${SITE_BASE}/api/lists/content/${listid}?_format=json`, {
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
      NavigationService.navigate(route);
    });
  };
};

export const removePolishFromList = (uid, listid, pID, route) => {
  return (dispatch) => {
    dispatch({ type: START_API_CALL });

    fetch(`${SITE_BASE}/api/lists/content/${listid}?_format=json`, {
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
      dispatch({ type: FINISH_API_CALL });
      NavigationService.navigate(route);
    });
  };
};
