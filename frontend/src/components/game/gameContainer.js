import {
    connect
} from 'react-redux';
import {
    getPlayerProgress,
    savePlayerProgress
} from '../../actions/gameActions';

import Game from './game';

const mapStateToProps = state => ({
    authenticatedPlayer: state.session.player,
    currentPlayer: state.game.currentPlayer
});

const mapDispatchToProps = dispatch => ({
    getPlayerProgress: id => dispatch(getPlayerProgress(id)),
    savePlayerState: (id, saveState) => dispatch(savePlayerProgress(id, saveState))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
