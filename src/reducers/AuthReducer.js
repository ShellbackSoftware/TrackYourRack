import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  AUTHENTICATE_USER,
  LOGOUT_USER,
  SET_TOKEN,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  CLEAR_MESSAGE,
  PASS_RESET_SUCCESS,
  PASS_RESET_FAIL
 } from '../actions/constants';

const INITIAL_STATE = {
 username: '',
 password: '',
 loading: false,
 error: '',
 uid: '',
 token: '',
 message: ''
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
             error: info,
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
      case REGISTER_USER:
        return { ...state, loading: false, message: info };
      case REGISTER_USER_FAIL:
        return { ...state, error: info, loading: false };
      case CLEAR_MESSAGE:
        return { ...state, message: '', error: '' };
      case PASS_RESET_SUCCESS:
        return { ...state, loading: false, message: info };
      case PASS_RESET_FAIL:
        return { ...state, loading: false, error: info };
     default:
         return state;
 }
};
