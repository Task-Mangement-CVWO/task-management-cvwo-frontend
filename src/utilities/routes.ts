const Routes = {
  home: '/home',
  user: {
    login: '/user/login',
    signup: '/user/signup',
  },
  url: process.env.REACT_APP_BACKEND_API_URL,
  calendarUrl: process.env.REACT_APP_CALENDAR_API_URL,
};

export default Routes;
