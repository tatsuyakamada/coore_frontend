import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Router from './Router';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Layout from './pages/Layout';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Layout>
      <Router />
    </Layout>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
