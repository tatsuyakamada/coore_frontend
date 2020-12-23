import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import IndexDish from './components/pages/dishes/index';
import ShowDish from './components/pages/dishes/show';
import Home from './components/pages/Home';
import IndexSchedule from './components/pages/schedules/index';
import IndexStuff from './components/pages/stuffs/index';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/stuffs" component={IndexStuff} />
      <Route exact path="/dishes" component={IndexDish} />
      <Route exact path="/dishes/:id" component={ShowDish} />
      <Route exact path="/schedules" component={IndexSchedule} />
    </Switch>
  </BrowserRouter>
);

export default Router;
