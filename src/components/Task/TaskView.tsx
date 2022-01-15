import React from 'react';
import AddTaskButton from '../AddTaskButton/AddTaskButton';
import Search from '../Search/Search';
import TaskCard from './TaskCard';
import TaskItem from './TaskItem/TaskItem';

import classes from './TaskView.module.css';

const TaskView: React.FC<{ onShowAddTask: () => void }> = props => {
  return (
    <div className={classes.taskView}>
      <div className={classes.createTask}>
        <p>All Tasks</p>
        <div className={classes.addAndSearch}>
          <AddTaskButton onShowAddTask={props.onShowAddTask} />
          <Search />
        </div>
      </div>
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
