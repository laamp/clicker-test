import {
    combineReducers
} from 'redux';

import SessionErrorsReducer from './sessionErrorsReducer';
import GameErrorsReducer from './gameErrorsReducer';

export default combineReducers({
    session: SessionErrorsReducer,
    game: GameErrorsReducer
});
