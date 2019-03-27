import {
  START_IMAGE_UPLOAD,
  FINISH_IMAGE_UPLOAD,
  START_SINGLE_UPLOAD,
  FINISH_SINGLE_UPLOAD,
  UPLOAD_ERROR
 } from '../actions/constants';

const INITIAL_STATE = {
  loadingImage: false,
  loadingCreate: false,
  uploadError: ''
};

export default (state = INITIAL_STATE, action) => {
  const info = action.payload;
  switch (action.type) {
    case START_IMAGE_UPLOAD:
      return { ...state, loadingImage: true, uploadError: '' };
    case START_SINGLE_UPLOAD:
      return { ...state, loadingCreate: true, uploadError: '' };
    case FINISH_IMAGE_UPLOAD:
      return { ...state, loadingImage: false };
    case FINISH_SINGLE_UPLOAD:
      return { ...state, loadingCreate: false };
    case UPLOAD_ERROR:
      return { ...state, uploadError: info };
    default:
      return state;
 }
};
