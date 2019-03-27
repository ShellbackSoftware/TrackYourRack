import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  AUTHENTICATE_USER,
  LOGOUT_USER,
  SET_TOKEN
 } from '../actions/constants';

const INITIAL_STATE = {
 username: '',
 password: '',
 loading: false,
 error: '',
 uid: '',
 token: ''
};

export default (state = INITIAL_STATE, action) => {
  const info = action.payload;

  switch (action.type) {
     case USERNAME_CHANGED:
         return { ...state, username: info };
     case PASSWORD_CHANGED:
         return { ...state, password: info };
     case LOGIN_USER:
         return {
           ...state,
           loading: true,
           error: ''
         };
     case LOGIN_USER_SUCCESS:
         return {
           ...state,
           username: info.current_user.name,
           uid: info.current_user.uid,
           token: info.csrf_token,
           error: '',
           loading: false
         };
     case LOGIN_USER_FAIL:
         return {
             ...state,
             error: 'Authentication Error',
             password: '',
             loading: false
         };
      case AUTHENTICATE_USER:
        return {
          ...state,
          username: info.username,
          uid: info.uid,
          token: info.token
        };
      case SET_TOKEN:
        return { ...state, token: info };
      case LOGOUT_USER:
        return INITIAL_STATE;
     default:
         return state;
 }
};
