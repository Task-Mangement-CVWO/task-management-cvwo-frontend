import React from 'react';
import TaskBadge from './TaskBadge';
import classes from './TaskCard.module.css';

const TaskCard: React.FC<{ state: string; noOfTask: number }> = props => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p>{props.state}</p>
        <TaskBadge numberOfTasks={props.noOfTask} />
      </div>
      <div className={classes.card}>
        <ul>{props.children}</ul>
      </div>
    </div>
  );
};

export default TaskCard;
