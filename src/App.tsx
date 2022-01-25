import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/Routers/AppRouter';
import Notification from './components/UI/Notification/Notification';
import { RootState } from './store';
import { uiActions } from './store/ui-slice';

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.ui.notifcation);
  const isNotification = !!notification.message && !!notification.status && !!notification.title;
  useEffect(() => {
    setTimeout(() => {
      console.log('clearing notification');
      dispatch(uiActions.clearNotification());
    }, 3500);
  }, [isNotification]);

  return (
    <Fragment>
      {isNotification && <Notification status={notification.status} message={notification.message} title={notification.title} />}
      <Router>
        <AppRouter />
      </Router>
    </Fragment>
  );
}

export default App;
