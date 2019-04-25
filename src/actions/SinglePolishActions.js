/* eslint-disable no-underscore-dangle */
import NavigationService from '../components/helpers/NavigationService';
import {
  SITE_BASE,
  START_SINGLE_UPLOAD,
  FINISH_SINGLE_UPLOAD,
  UPLOAD_ERROR
} from './constants';

export const addSinglePolish = (polish, token, route) => {
  const {
      uid,
      pBrand,
      pName,
      pNumber,
      pSeason,
      pCollection,
      pYear,
      pSwatch,
      pFinish,
      pSite,
      filename
    } = polish;
  return (dispatch) => {
    dispatch({ type: START_SINGLE_UPLOAD });
    fetch(`${SITE_BASE}/api/polish?_format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        uid,
        pBrand,
        pName,
        pNumber,
        pSeason,
        pCollection,
        pYear,
        pSwatch,
        pFinish,
        pSite,
        filename
      })
    })
    .then(res => {
      if (!res.ok) {
        dispatch({ type: FINISH_SINGLE_UPLOAD });
        dispatch({ type: UPLOAD_ERROR, payload: res._bodyText });
      } else {
        return res.json();
      }
    })
    .then(pID => {
      dispatch({ type: FINISH_SINGLE_UPLOAD });
      NavigationService.navigate(route);
    });
  };
};
