import * as APIUtil from '../util/gameApiUtil';

export const RECEIVE_LEADERBOARD = 'RECEIVE_LEADERBOARD';
export const RECEIVE_PLAYER_PROGRESS = 'RECEIVE_PLAYER_PROGRESS';
export const RECEIVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS';
export const CLEAR_GAME_ERRORS = 'CLEAR_GAME_ERRORS';

export const receiveLeaderboard = leaderboard => ({
    type: RECEIVE_LEADERBOARD,
    leaderboard
});

export const receivePlayerProgress = currentPlayer => ({
    type: RECEIVE_PLAYER_PROGRESS,
    currentPlayer
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

export const getPlayerProgress = id => dispatch => (
    APIUtil.getPlayerProgress(id)
    .then(res => dispatch(receivePlayerProgress(res.data)))
    .catch(err => dispatch(receiveGameErrors(err)))
);

export const savePlayerProgress = (id, saveState) => dispatch => (
    APIUtil.savePlayerProgress(id, saveState)
    .then(() => console.log('Progress saved'))
    .catch(err => dispatch(receiveGameErrors(err)))
);
