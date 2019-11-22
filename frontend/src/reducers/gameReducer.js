import {
    RECEIVE_LEADERBOARD
} from '../actions/gameActions';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_LEADERBOARD:
            return {
                ...state,
                leaderboard: action.leaderboard
            };
        default:
            return state;
    }
};
