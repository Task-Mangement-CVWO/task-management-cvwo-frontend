import React from 'react';
import TagItem from './TagItem';
import classes from './TaskItem.module.css';

const TaskItem: React.FC<{ title: string; description: string }> = props => {
  return (
    <li className={classes.container}>
      <div className={classes.delete}>-</div>
      <p>{props.title}</p>
      <label>{props.description}</label>
      <div className={classes.tags}>
        <TagItem title={'CS2030S'} />
        <TagItem title={'CS2040S'} />
      </div>
    </li>
  );
};

export default TaskItem;
