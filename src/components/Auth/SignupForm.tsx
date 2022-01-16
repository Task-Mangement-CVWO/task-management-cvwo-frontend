import React from 'react';
import { useHistory } from 'react-router';
import AuthInput from './AuthInput/AuthInput';
import AuthFormBtn from './AuthFormBtn/AuthFormBtn';
import classes from './LoginForm.module.css';

const SignupForm = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/user/login');
  };
  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <form>
          <h1>Register</h1>
          <AuthInput label='Username' />
          <AuthInput label='Password' />
          <AuthInput label='Confirm Password' />
          <div className={classes.submitForm}>
            <p>
              Already have an account?{' '}
              <a href='#' onClick={handleClick}>
                Sign In
              </a>
            </p>
            <AuthFormBtn label='Sign Up' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
