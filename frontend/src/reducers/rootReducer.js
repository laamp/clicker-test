import {
    combineReducers
} from 'redux';
import game from './gameReducer';
import session from './sessionReducer';
import errors from './errorsReducer';

const RootReducer = combineReducers({
    game,
    session,
    errors
});

export default RootReducer;
