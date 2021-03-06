import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/organisms/Header';
import Layout from './components/pages/Layout';
import Router from './Router';
import * as serviceWorker from './serviceWorker';

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
