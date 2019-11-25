import {
    createStore,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

const configureStore = (preloadedState = {}) => {
    if (process.env.NODE_ENV === 'production') {
        return createStore(
            rootReducer,
            preloadedState,
            applyMiddleware(thunk)
        );
    } else {
        return createStore(
            rootReducer,
            preloadedState,
            applyMiddleware(thunk, logger)
        );
    }
};

export default configureStore;
