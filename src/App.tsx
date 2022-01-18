import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/Routers/AppRouter';
import Notification from './components/UI/Notification/Notification';
import { RootState } from './store';

function App() {
  const notification = useSelector((state: RootState) => state.ui.notifcation);
  const isNotification = notification.message.length !== 0 && notification.status.length !== 0 && notification.title.length !== 0;
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
