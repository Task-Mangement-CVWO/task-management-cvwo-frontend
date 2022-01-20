import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Routes from '../../utilities/routes';
import Home from '../../pages/Home/Home';
import Login from '../../pages/auth/Login';
import Signup from '../../pages/auth/Signup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { authActions } from '../../store/auth-slice';
import { magic } from '../../utilities/magicVariables';
import { getLocalStorageValue } from '../../utilities/localStorage';

const AppRouter = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = getLocalStorageValue(magic.accessToken);
    if (accessToken) {
      dispatch(authActions.login({ accessToken: accessToken }));
      history.push('/home');
    }
  }, []);

  return (
    <Switch>
      <Route exact path={Routes.user.login} component={Login} />
      <Route exact path={Routes.user.signup} component={Signup} />
      {isLoggedIn && <Route exact path={Routes.home} component={Home} />}
      <Route path='*'>
        <Redirect to={Routes.user.login} />
      </Route>
    </Switch>
  );
};

export default AppRouter;
