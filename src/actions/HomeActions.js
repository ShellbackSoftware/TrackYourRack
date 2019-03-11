import NavigationService from '../components/helpers/NavigationService';
import {
    SELECT_LIST
} from './constants';

export const selectList = (dispatch, listId) => {
  dispatch({
      type: SELECT_LIST,
      payload: listId
  });
  NavigationService.navigate('PolishList', { listId });
};
