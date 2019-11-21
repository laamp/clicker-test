import {
    RECEIVE_PLAYER_LOGOUT,
    RECEIVE_CURRENT_PLAYER
} from '../actions/sessionActions';

const initialState = {
    isAuthenticated: false,
    player: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_PLAYER:
            return {
                ...state,
                isAuthenticated: !!action.currentPlayer,
                    player: action.currentPlayer
            };
        case RECEIVE_PLAYER_LOGOUT:
            return {
                isAuthenticated: false, player: null
            };
        default:
            return state;
    }
};
