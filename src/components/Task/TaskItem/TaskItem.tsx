import React from 'react';
import TagItem from './TagItem';
import classes from './TaskItem.module.css';

const TaskItem = () => {
  return (
    <li className={classes.container}>
      <div className={classes.delete}>-</div>
      <p>Title</p>
      <label>Description</label>
      <div className={classes.tags}>
        <TagItem />
        <TagItem />
        <TagItem />
        <TagItem />
        <TagItem />
      </div>
    </li>
  );
};

export default TaskItem;
