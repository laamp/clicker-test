import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_PLAYER,
    CLEAR_SESSION_ERRORS
} from '../actions/sessionActions';

const _nullErrors = {};

const SessionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case CLEAR_SESSION_ERRORS:
        case RECEIVE_CURRENT_PLAYER:
            return _nullErrors;
        default:
            return state;
    }
};

export default SessionErrorsReducer;
