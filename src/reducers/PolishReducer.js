import {
  START_SINGLE_UPLOAD,
  FINISH_SINGLE_UPLOAD,
  UPLOAD_ERROR
 } from '../actions/constants';

const INITIAL_STATE = {
  loadingImage: false,
  loadingCreate: false,
  uploadError: '',
  fromUpload: true
};

export default (state = INITIAL_STATE, action) => {
  const info = action.payload;
  switch (action.type) {
    case START_SINGLE_UPLOAD:
      return { ...state, loadingCreate: true, uploadError: '', fromUpload: false };
    case FINISH_SINGLE_UPLOAD:
      return { ...state, loadingCreate: false, fromUpload: true };
    case UPLOAD_ERROR:
      return { ...state, uploadError: info };
    default:
      return state;
 }
};
