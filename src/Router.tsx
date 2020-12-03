import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import IndexDish from './pages/dishes/index';
import ShowDish from './pages/dishes/show';
import Home from './pages/Home';
import IndexSchedule from './pages/schedules/index';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dishes" component={IndexDish} />
      <Route exact path="/dishes/:id" component={ShowDish} />
      <Route exact path="/schedules" component={IndexSchedule} />
    </Switch>
  </BrowserRouter>
);

export default Router;
