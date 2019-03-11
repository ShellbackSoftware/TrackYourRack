import {
  SITE_BASE,
  ALL_POLISHES,
  START_API_CALL
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
