import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dishes from './pages/Dishes';
import NewDish from './pages/dishes/NewDish';
import EditDish from './pages/dishes/EditDish';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/dishes" component={Dishes} />
        <Route exact path="/dishes/new" component={NewDish} />
        <Route exact path="/dishes/edit/:id" component={EditDish} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
