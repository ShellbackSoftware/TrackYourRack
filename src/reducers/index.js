import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CustomListsReducer from './CustomListsReducer';
import PolishReducer from './PolishReducer';

export default combineReducers({
    auth: AuthReducer,
    lists: CustomListsReducer,
    polishes: PolishReducer
});
