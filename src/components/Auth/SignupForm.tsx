import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import AuthInput from './AuthInput/AuthInput';
import AuthFormBtn from './AuthFormBtn/AuthFormBtn';
import classes from './LoginForm.module.css';
import Routes from '../../utilities/routes';

const SignupForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');

  const usernameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(event.target.value);
  };
  const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
  };
  const confirmPasswordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordInput(event.target.value);
  };

  const handleClick = () => {
    history.push('/user/login');
  };

  const signUp = async (username: string, password: string, confirmPassword: string) => {
    const response = await fetch(Routes.url + '/users/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: confirmPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  };

  const handelSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const isPasswordMatch = passwordInput === confirmPasswordInput;
    dispatch(uiActions.showNotification({ status: 'pending', message: 'Signing Up...', title: 'Pending' }));
    if (usernameInput.trim().length == 0 || passwordInput.trim().length == 0 || confirmPasswordInput.trim().length == 0) {
      dispatch(uiActions.showNotification({ status: 'error', message: 'Input cannot be empty', title: 'Error' }));
      return;
    }
    if (usernameInput.trim().indexOf(' ') !== -1) {
      dispatch(uiActions.showNotification({ status: 'error', message: 'Username cannot contain space', title: 'Error' }));
      return;
    }
    if (!isPasswordMatch) {
      dispatch(uiActions.showNotification({ status: 'error', message: 'Passwords do not match', title: 'Error' }));
      return;
    }
    const username = usernameInput.trim();
    const response = await signUp(username, passwordInput, confirmPasswordInput);
    if (!response.ok) {
      type error = { message: string };
      const data = (await response.json()) as unknown as error;
      dispatch(uiActions.showNotification({ status: 'error', message: data.message, title: 'Error' }));
      return;
    }

    setUsernameInput('');
    setPasswordInput('');
    setConfirmPasswordInput('');
    dispatch(uiActions.showNotification({ status: 'success', message: 'Successfully Signed Up', title: 'Success' }));
  };
  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <form onSubmit={handelSubmit}>
          <h1>Register</h1>
          <AuthInput type='text' value={usernameInput} onChange={usernameInputHandler} label='Username' />
          <AuthInput type='password' value={passwordInput} onChange={passwordInputHandler} label='Password' />
          <AuthInput type='password' value={confirmPasswordInput} onChange={confirmPasswordInputHandler} label='Confirm Password' />
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
