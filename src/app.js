import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import LoadingPage from './containers/LoadingPage';
import './styles/styles.scss';
import WebContainer from './containers/WebContainer';

const store = configureStore();
const history = createHistory();
const jsx = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={WebContainer} />
    </Router>
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

setTimeout(() => renderApp(), 50);
// can set firebase to attempt to auth here
// firebase.auth().onAuthStateChanged((user) => {
//   store.dispatch(user ? login(user.uid) : logout());
//   renderApp();
// });
