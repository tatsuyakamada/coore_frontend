import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import IndexDish from './pages/dishes/index';
import EditDish from './pages/dishes/edit';
import IndexSchedule from './pages/schedules/index';

const Router: React.FC = () => {
  return (
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
};

export default Router;
