import React from 'react';
import classes from './AuthInput.module.css';

const AuthInput: React.FC<{ label: string }> = props => {
  return (
    <div className={classes.input}>
      <label>{props.label}</label>
      <input type='text' />
    </div>
  );
};

export default AuthInput;
