import React from 'react';
import classes from './TagItem.module.css';

const TagItem: React.FC<{ title: string }> = props => {
  return <div className={classes.tag}>{props.title}</div>;
};

export default TagItem;
