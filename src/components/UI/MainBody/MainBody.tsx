import React from 'react';
import classes from './MainBody.module.css';

const MainBody: React.FC = props => {
  return <div className={classes.body}>{props.children}</div>;
};

export default MainBody;
