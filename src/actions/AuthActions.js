/* eslint-disable no-underscore-dangle */
import { SecureStore } from 'expo';
import NavigationService from '../components/helpers/NavigationService';
import {
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SITE_BASE,
    AUTHENTICATE_USER,
    LOGOUT_USER,
    SET_TOKEN
} from './constants';

export const usernameChanged = (text) => {
    return {
        type: USERNAME_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    fetch(`${SITE_BASE}/user/login?_format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        pass: password,
      }),
    })
    .then(res => res.json())
    .then(resData => loginUserSuccess(dispatch, resData))
    .catch(() => dispatch(loginUserFail(dispatch)));
  };
};

export const setUserToken = () => {
  return (dispatch) => {
    const gotToken = fetch(`${SITE_BASE}/session/token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      dispatch({
        type: SET_TOKEN,
        payload: res._bodyText
      });
    });

    return gotToken;
  };
};

export const authenticateUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE_USER,
      payload: user
    });
  };
};

export const logoutUser = (lotoken) => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    // Log user out from Drupal
    fetch(`${SITE_BASE}/user/logout?_format=json&token=${lotoken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'//,
        //'X-CSRF-Token': token
      },
    })
    .then(res => res.json())
    .then(() => {
      const tokenPromise = SecureStore.deleteItemAsync('token');
      const namePromise = SecureStore.deleteItemAsync('username');
      const uidPromise = SecureStore.deleteItemAsync('uid');
      const lotokenPromise = SecureStore.deleteItemAsync('lotoken');
      Promise.all([tokenPromise, namePromise, uidPromise, lotokenPromise])
      .then(() => NavigationService.navigate('Login'));
    });
  };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    // user = {csrf_token, current_user { name, uid }, logout_token }
    const lotokenPromise = SecureStore.setItemAsync('lotoken', user.logout_token);
    const tokenPromise = SecureStore.setItemAsync('token', user.csrf_token);
    const namePromise = SecureStore.setItemAsync('username', user.current_user.name);
    const uidPromise = SecureStore.setItemAsync('uid', user.current_user.uid);
    Promise.all([lotokenPromise, tokenPromise, namePromise, uidPromise])
    .then(() => NavigationService.navigate('Auth'));
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};
