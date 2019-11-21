import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common.Authorization = token;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};

export const signup = playerData => (
    axios.post('/api/players/register', playerData)
);

export const login = playerData => (
    axios.post('/api/players/login', playerData)
);
