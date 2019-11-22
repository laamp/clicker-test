import {
    connect
} from 'react-redux';
import {
    getLeaderboard
} from '../../actions/gameActions';

import Leaderboard from './leaderboard';

const mapStateToProps = state => ({
    leaderboard: state.game.leaderboard
});

const mapDispatchToProps = dispatch => ({
    getLeaderboard: () => dispatch(getLeaderboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
