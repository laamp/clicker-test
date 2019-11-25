import axios from 'axios';

export const getLeaderboard = () => (
    axios.get('/api/players/leaderboard')
);

export const getPlayerProgress = id => (
    axios.get(`api/players/${id}`)
);

export const savePlayerProgress = (id, saveState) => (
    axios.patch(`api/players/${id}`, saveState)
);
