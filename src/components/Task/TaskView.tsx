import React, { useEffect } from 'react';
import AddTaskButton from '../AddTaskButton/AddTaskButton';
import Search from '../Search/Search';
import TaskCard from './TaskCard';
import TaskItem from './TaskItem/TaskItem';
import classes from './TaskView.module.css';
import Routes from '../../utilities/routes';

import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../../store/task-slice';

const TaskView: React.FC<{ onShowAddTask: () => void }> = props => {
  const dispatch = useDispatch();
  const taskItems = useSelector((state: RootState) => state.task.data);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const toDoArray = taskItems.filter(item => item.state == 'To Do');
  const inProgressArray = taskItems.filter(item => item.state == 'In Progress');
  const completedArray = taskItems.filter(item => item.state == 'Completed');

  const getTasks = async () => {
    const response = await fetch(Routes.url + '/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': accessToken,
      },
    });
    return response;
  };

  useEffect(() => {
    (async () => {
      const response = await getTasks();
      const data = await response.json();
      dispatch(taskActions.updateTasks({ data: data.data }));
    })();
  }, [taskItems]);

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
        <TaskCard noOfTask={toDoArray.length} state='To do'>
          {toDoArray.map(item => (
            <TaskItem key={item.id} title={item.title || ''} description={item.description || ''} />
          ))}
        </TaskCard>

        <TaskCard noOfTask={inProgressArray.length} state='In progress'>
          {inProgressArray.map(item => (
            <TaskItem key={item.id} title={item.title || ''} description={item.description || ''} />
          ))}
        </TaskCard>
        <TaskCard noOfTask={completedArray.length} state='Completed'>
          {completedArray.map(item => (
            <TaskItem key={item.id} title={item.title || ''} description={item.description || ''} />
          ))}
        </TaskCard>
      </div>
    </div>
  );
};

export default TaskView;
