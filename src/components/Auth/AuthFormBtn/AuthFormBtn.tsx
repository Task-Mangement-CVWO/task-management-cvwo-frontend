import React from 'react';
import classes from './AuthFormBtn.module.css';

const AuthFormBtn: React.FC<{ label: string }> = props => {
  return (
    <button type='submit' className={classes.button}>
      {props.label}
    </button>
  );
};

export default AuthFormBtn;
