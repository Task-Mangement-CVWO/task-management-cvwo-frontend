import React from 'react';
import classes from './TaskBadge.module.css';

const TaskBadge: React.FC<{ numberOfTasks: number }> = props => {
  return <div className={classes.badge}>{props.numberOfTasks}</div>;
};

export default TaskBadge;
