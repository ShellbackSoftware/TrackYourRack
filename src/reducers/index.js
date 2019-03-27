import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import HomeReducer from './HomeReducer';
import PolishesReducer from './PolishesReducer';
import PolishReducer from './PolishReducer';

export default combineReducers({
    auth: AuthReducer,
    lists: HomeReducer,
    polishes: PolishesReducer,
    polish: PolishReducer
});
