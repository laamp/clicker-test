import {
    connect
} from 'react-redux';
import {
    signup,
    login
} from '../../actions/sessionActions';

import SessionForm from './sessionForm';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    signup: playerData => dispatch(signup(playerData)),
    login: playerData => dispatch(login(playerData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
