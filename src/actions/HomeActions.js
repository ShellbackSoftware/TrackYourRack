import NavigationService from '../components/helpers/NavigationService';
import {
  START_API_CALL,
  SELECT_LIST,
  GET_LISTS,
  SITE_BASE
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
