import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes from '../../utilities/routes';
import Home from '../../pages/Home/Home';
import Login from '../../pages/auth/Login';
import Signup from '../../pages/auth/Signup';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path={Routes.user.login} component={Login} />
      <Route exact path={Routes.user.signup} component={Signup} />
      <Route exact path={Routes.home} component={Home} />
    </Switch>
  );
};

export default AppRouter;
