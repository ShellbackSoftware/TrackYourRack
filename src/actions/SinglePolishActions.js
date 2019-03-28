//import NavigationService from '../components/helpers/NavigationService';
import {
  SITE_BASE,
  START_IMAGE_UPLOAD,
  FINISH_IMAGE_UPLOAD,
  START_SINGLE_UPLOAD,
  FINISH_SINGLE_UPLOAD,
  UPLOAD_ERROR
} from './constants';
// eslint-disable-next-line
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
      pSite
    } = polish;
  return (dispatch) => {
    console.log(`Token: ${token}`);
    console.log(polish);
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
        pSite
      })
    })
    .then(res => res.json()) /*{
      if (!res.ok) {
        dispatch({ type: FINISH_SINGLE_UPLOAD });
        dispatch({ type: UPLOAD_ERROR, payload: 'An error has occurred, please try again.' });
      } else {
        dispatch({ type: FINISH_SINGLE_UPLOAD });
      }
      console.log(res);
    });*/
    .then(resData => {
      console.log(resData);
      dispatch({ type: FINISH_SINGLE_UPLOAD });
      if (resData === '') {
        dispatch({ type: UPLOAD_ERROR, payload: 'An error has occurred, please try again.' });
      }
    });
  };
};

export const uploadImage = (uid, b64) => {
  return (dispatch) => {
    dispatch({ type: START_IMAGE_UPLOAD });

    fetch(`${SITE_BASE}/entity/file?_format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        b64
      })
    })
    .then(() => {
      dispatch({ type: FINISH_IMAGE_UPLOAD });
    });
  };
};
