import React from 'react';
import { useHistory } from 'react-router';

import AuthInput from './AuthInput/AuthInput';
import AuthFormBtn from './AuthFormBtn/AuthFormBtn';
import classes from './LoginForm.module.css';

const LoginForm: React.FC = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/user/signup');
  };

  const handelSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Signing In');
  };
  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <form onSubmit={handelSubmit}>
          <h1>Welcome!</h1>
          <AuthInput label='Username' />
          <AuthInput label='Password' />
          <div className={classes.submitForm}>
            <p>
              Don&apos;t have an account?{' '}
              <a href='#' onClick={handleClick}>
                Sign Up
              </a>
            </p>
            <AuthFormBtn label='Sign In' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
