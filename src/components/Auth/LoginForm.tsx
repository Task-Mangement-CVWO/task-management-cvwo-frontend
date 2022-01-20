/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { authActions } from '../../store/auth-slice';

import AuthInput from './AuthInput/AuthInput';
import AuthFormBtn from './AuthFormBtn/AuthFormBtn';
import classes from './LoginForm.module.css';
import Routes from '../../utilities/routes';

const LoginForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const usernameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(event.target.value);
  };
  const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
  };

  const handleClick = () => {
    history.push('/user/signup');
  };

  const login = async (username: string, password: string) => {
    const response = await fetch(Routes.url + '/users/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  };

  const handelSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(uiActions.showNotification({ status: 'pending', message: 'Logging In...', title: 'Pending' }));
    const response = await login(usernameInput, passwordInput);
    if (response.ok) {
      dispatch(uiActions.showNotification({ status: 'success', message: 'Successfully Logged In', title: 'Success' }));
      type success = { data: { accessToken: string } };
      const data = (await response.json()) as unknown as success;
      dispatch(authActions.login({ accessToken: data.data.accessToken }));
      history.push('/home');
    } else {
      type error = { message: string };
      const data = (await response.json()) as unknown as error;
      dispatch(uiActions.showNotification({ status: 'error', message: data.message, title: 'Error' }));
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <form onSubmit={handelSubmit}>
          <h1>Welcome!</h1>
          <AuthInput type='text' onChange={usernameInputHandler} value={usernameInput} label='Username' />
          <AuthInput type='password' onChange={passwordInputHandler} value={passwordInput} label='Password' />
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
