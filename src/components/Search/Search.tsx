import React from 'react';
import classes from './Search.module.css';

const Search: React.FC<{ value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }> = props => {
  return <input value={props.value} onChange={props.onChange} className={classes.input} placeholder='Search' type='text' />;
};

export default Search;
