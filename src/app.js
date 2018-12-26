import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGray from '@material-ui/core/colors/blueGrey';
import cyan from '@material-ui/core/colors/cyan';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import LoadingPage from './containers/LoadingPage';
import './styles/styles.scss';
import WebContainer from './containers/WebContainer';

const store = configureStore();
const history = createHistory();
const muiTheme = createMuiTheme({
  palette: {
    primary: blueGray,
    secondary: cyan,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const jsx = (
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <Router history={history}>
        <Route path="/" component={WebContainer} />
      </Router>
    </MuiThemeProvider>
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
