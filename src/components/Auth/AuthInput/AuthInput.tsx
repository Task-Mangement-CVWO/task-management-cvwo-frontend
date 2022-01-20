import React from 'react';
import classes from './AuthInput.module.css';

const AuthInput: React.FC<{
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = props => {
  return (
    <div className={classes.input}>
      <label>{props.label}</label>
      <input type={props.type} value={props.value} onChange={props.onChange} />
    </div>
  );
};

export default AuthInput;
