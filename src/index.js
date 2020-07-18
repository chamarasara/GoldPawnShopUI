import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from "./actions/types";
//const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
//const store = createStoreWithMiddleware(reducers);
// const user = localStorage.getItem('user');
// if (user) {
//     store.dispatch({ type: AUTHENTICATED });
// }
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)));

// const user = localStorage.getItem('user');
// if (user) {
//     store.dispatch({ type: AUTHENTICATED });
// } else if (!user) {
//     store.dispatch({ type: UNAUTHENTICATED });
// } else {
//     store.dispatch({ type: AUTHENTICATION_ERROR });
// }
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);
//createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk))


