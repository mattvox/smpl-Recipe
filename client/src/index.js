import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';

import promise from 'redux-promise';
import reducers from './reducers';
import routes from './routes';

import './index.css';

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(promise),
));
/* eslint-enable */

// const history = syncHistoryWithStore(browserHistory, reduxStore);

// history.listen((location) => console.log(location));

ReactDOM.render(
  <Provider store={reduxStore}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
, document.querySelector('#root'));
