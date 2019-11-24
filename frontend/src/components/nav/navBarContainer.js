import {
    connect
} from 'react-redux';
import {
    savePlayerProgress
} from '../../actions/gameActions';
import {
    logout
} from '../../actions/sessionActions';

import NavBar from './navBar';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    currentPlayer: state.session.player
});

const mapDispatchToProps = dispatch => ({
    savePlayerState: (id, saveState) => dispatch(savePlayerProgress(id, saveState)),
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
