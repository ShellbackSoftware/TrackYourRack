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
    SET_TOKEN,
    REGISTER_USER,
    REGISTER_USER_FAIL,
    CLEAR_MESSAGE,
    PASS_RESET_SUCCESS,
    PASS_RESET_FAIL
} from './constants';

export const clearAuthMessage = () => {
  return {
    type: CLEAR_MESSAGE
  };
};

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
    .then(res => {
      if (res.status !== 200) {
        let errorMsg = res._bodyText.substring(res._bodyText.indexOf(':') + 2);
        errorMsg = errorMsg.slice(0, -2);
        dispatch({ type: LOGIN_USER_FAIL, payload: errorMsg });
      } else {
        return res.json();
      }
    })
    .then(resData => loginUserSuccess(dispatch, resData));
  };
};

export const resetPassword = (mail) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    fetch(`${SITE_BASE}/user/password?_format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mail
      }),
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: PASS_RESET_SUCCESS,
          payload: 'Password reset instructions have been sent to your email.'
        });
      } else {
        let errorMsg = res._bodyText;
        if (errorMsg.indexOf('blocked') === -1) {
          errorMsg = 'Email not found.';
        } else {
          errorMsg = `This account has not been activated yet.
           Please follow the instructions in your welcome email.`;
        }
        dispatch({ type: PASS_RESET_FAIL, payload: errorMsg });
      }
    });
  };
};

export const registerUser = ({ name, mail }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    fetch(`${SITE_BASE}/user/register?_format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: { value: name },
        mail: { value: mail }
      }),
    })
    .then(res => {
      if (res.status !== 200) {
        let errorMsg = res._bodyText;
        // Username taken, email not
        if ((errorMsg.indexOf('name:') !== -1) && (errorMsg.indexOf('mail:' === -1))) {
          errorMsg = errorMsg.substring(errorMsg.indexOf('nname:') + 6);
          errorMsg = errorMsg.slice(0, -4);
        } else if ((errorMsg.indexOf('mail:') !== -1) && (errorMsg.indexOf('name:' === -1))) {
        // Email taken, username not
          errorMsg = errorMsg.substring(errorMsg.indexOf('nmail:') + 7);
          errorMsg = errorMsg.slice(0, -4);
        } else {
        // Email and username taken
          errorMsg = 'Username and email are both already in use.';
        }
        dispatch(registerFail(dispatch, errorMsg));
      } else {
        return res.json();
      }
    })
    .then(() => dispatch({ type: REGISTER_USER,
      payload: `Thank you for registering at Shellback Software!
      Please check your email (${mail}) for further instructions.` }));
  };
};
// eslint-disable-next-line
const registerSuccess = (user) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER,
      payload: user
    });

    const lotokenPromise = SecureStore.setItemAsync('lotoken', user.logout_token);
    const tokenPromise = SecureStore.setItemAsync('token', user.csrf_token);
    const namePromise = SecureStore.setItemAsync('username', user.current_user.name);
    const uidPromise = SecureStore.setItemAsync('uid', user.current_user.uid);
    Promise.all([lotokenPromise, tokenPromise, namePromise, uidPromise])
    .then(() => NavigationService.navigate('Login'));
  };
};

const registerFail = (dispatch, error) => {
  dispatch({ type: REGISTER_USER_FAIL, payload: error });
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
        'Content-Type': 'application/json'
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
