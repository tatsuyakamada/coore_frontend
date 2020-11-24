import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import About from './pages/About';
import EditDish from './pages/dishes/edit';
import IndexDish from './pages/dishes/index';
import Home from './pages/Home';
import IndexSchedule from './pages/schedules/index';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/dishes" component={IndexDish} />
      <Route exact path="/dishes/edit/:id" component={EditDish} />
      <Route exact path="/schedules" component={IndexSchedule} />
    </Switch>
  </BrowserRouter>
);

export default Router;
