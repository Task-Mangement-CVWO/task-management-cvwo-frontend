import React, { Fragment } from 'react';
import LoginForm from '../../../components/Auth/LoginForm';
import MainBody from '../../../components/UI/MainBody/MainBody';

const Login = () => {
  return (
    <Fragment>
      <MainBody>
        <LoginForm />
      </MainBody>
    </Fragment>
  );
};

export default Login;
