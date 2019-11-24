import {
    connect
} from 'react-redux';
import {
    getPlayerProgress,
    savePlayerProgress,
    clearGameErrors,
    getLeaderboard
} from '../../actions/gameActions';

import Game from './game';

const mapStateToProps = state => ({
    authenticatedPlayer: state.session.player,
    currentPlayer: state.game.currentPlayer
});

const mapDispatchToProps = dispatch => ({
    getPlayerProgress: id => dispatch(getPlayerProgress(id)),
    savePlayerState: (id, saveState) => dispatch(savePlayerProgress(id, saveState)),
    clearGameErrors: () => dispatch(clearGameErrors()),
    getLeaderboard: () => dispatch(getLeaderboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
