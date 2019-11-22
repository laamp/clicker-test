import {
    RECEIVE_GAME_ERRORS,
    CLEAR_GAME_ERRORS
} from '../actions/gameActions';

const _nullErrors = {};

const GameErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_GAME_ERRORS:
            return action.errors;
        case CLEAR_GAME_ERRORS:
            return _nullErrors;
        default:
            return state;
    }
};

export default GameErrorsReducer;
