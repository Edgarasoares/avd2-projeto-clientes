import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PaginaPrincipal from '../pages/Principal';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={PaginaPrincipal} />
  </Switch>
);

export default Routes;
