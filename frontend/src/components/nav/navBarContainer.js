import {
    connect
} from 'react-redux';
import {
    logout
} from '../../actions/sessionActions';

import NavBar from './navBar';

const mapStateToProps = state => ({
    state,
    loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
