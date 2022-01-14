import React from 'react';
import TaskCard from './TaskCard';
import TaskItem from './TaskItem/TaskItem';

import classes from './TaskView.module.css';

const TaskView = () => {
  return (
    <div className={classes.taskView}>
      <div className={classes.createTask}></div>
      <div className={classes.taskCards}>
        <TaskCard noOfTask={1} state='To do'>
          <TaskItem />
        </TaskCard>

        <TaskCard noOfTask={0} state='In progress' />
        <TaskCard noOfTask={0} state='Completed' />
      </div>
    </div>
  );
};

export default TaskView;
