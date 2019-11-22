import * as APIUtil from '../util/gameApiUtil';

export const RECEIVE_LEADERBOARD = 'RECEIVE_LEADERBOARD';
export const RECEIVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS';
export const CLEAR_GAME_ERRORS = 'CLEAR_GAME_ERRORS';

export const receiveLeaderboard = leaderboard => ({
    type: RECEIVE_LEADERBOARD,
    leaderboard
});

export const receiveGameErrors = errors => ({
    type: RECEIVE_GAME_ERRORS,
    errors
});

export const clearGameErrors = () => ({
    type: CLEAR_GAME_ERRORS
});

export const getLeaderboard = () => dispatch => (
    APIUtil.getLeaderboard()
    .then(res => dispatch(receiveLeaderboard(res.data)))
    .catch(err => dispatch(receiveGameErrors(err)))
);
