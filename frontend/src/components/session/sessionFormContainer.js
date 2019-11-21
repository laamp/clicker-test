import {
    connect
} from 'react-redux';
import {
    signup,
    login,
    clearSessionErrors
} from '../../actions/sessionActions';

import SessionForm from './sessionForm';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    sessionErrors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    signup: playerData => dispatch(signup(playerData)),
    login: playerData => dispatch(login(playerData)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
