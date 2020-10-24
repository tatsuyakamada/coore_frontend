import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Router from './Router';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Router />
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
