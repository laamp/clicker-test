import axios from 'axios';

export const getLeaderboard = () => (
    axios.get('/api/players/leaderboard')
);
