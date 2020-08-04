import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from "./actions/types";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);
//createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk))


