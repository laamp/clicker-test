import {
    RECEIVE_LEADERBOARD,
    RECEIVE_PLAYER_PROGRESS
} from '../actions/gameActions';

const initialState = {
    currentPlayer: null
};

export default (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LEADERBOARD:
            return {
                ...state,
                leaderboard: action.leaderboard
            };
        case RECEIVE_PLAYER_PROGRESS:
            return {
                ...state, currentPlayer: action.currentPlayer
            };
        default:
            return state;
    }
};
