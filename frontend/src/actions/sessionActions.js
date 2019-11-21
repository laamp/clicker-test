import * as APIUtil from '../util/sessionApiUtil';
import jwt_decode from 'jwt-decode';

export const RECEIVE_PLAYER_LOGOUT = 'RECEIVE_PLAYER_LOGOUT';
export const RECEIVE_CURRENT_PLAYER = 'RECEIVE_CURRENT_PLAYER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

export const receiveCurrentPlayer = currentPlayer => ({
    type: RECEIVE_CURRENT_PLAYER,
    currentPlayer
});

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const logoutPlayer = () => ({
    type: RECEIVE_PLAYER_LOGOUT
});

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
});

export const signup = player => dispatch => (
    APIUtil.signup(player).then(res => {
        const {
            token
        } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentPlayer(decoded));
    })
    .catch(err => (
        dispatch(receiveErrors(err.response.data))
    ))
);

export const login = player => dispatch => (
    APIUtil.login(player).then(res => {
        const {
            token
        } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentPlayer(decoded));
    })
    .catch(err => {
        dispatch(receiveErrors(err.response.data));
    })
);

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    APIUtil.setAuthToken(false);
    dispatch(logoutPlayer());
};
