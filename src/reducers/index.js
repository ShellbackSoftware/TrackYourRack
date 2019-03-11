import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CustomListsReducer from './CustomListsReducer';

export default combineReducers({
    auth: AuthReducer,
    lists: CustomListsReducer
});
