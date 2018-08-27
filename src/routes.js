import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Calendar from './Components/Calendar/Calendar';
import Dashboard from './Components/Dashboard/Dashboard';
import Expenses from './Components/Expenses/Expenses';
import LandingPage from './Components/LandingPage/LandingPage';
import Settings from './Components/Settings/Settings';

export default (
  <Switch>
    <Route path="/calendar" component={Calendar} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/expenses" component={Expenses} />
    <Route path="/settings" component={Settings} />
    <Route exact path="/" component={LandingPage} />
  </Switch>
);
