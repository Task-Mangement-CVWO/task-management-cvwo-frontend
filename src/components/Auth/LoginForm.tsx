import React from 'react';
import { useHistory } from 'react-router';
import AuthInput from './AuthInput/AuthInput';
import AuthFormBtn from './AuthFormBtn/AuthFormBtn';
import classes from './LoginForm.module.css';

const LoginForm = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/user/signup');
  };
  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <form>
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
