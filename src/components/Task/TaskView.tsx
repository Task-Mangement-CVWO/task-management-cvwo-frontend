/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import AddTaskButton from '../AddTaskButton/AddTaskButton';
import Search from '../Search/Search';
import TaskCard from './TaskCard';
import TaskItem from './TaskItem/TaskItem';
import classes from './TaskView.module.css';
import Routes from '../../utilities/routes';
import moment from 'moment';
import _ from 'lodash';

import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../../store/task-slice';

const TaskView: React.FC<{ onShowAddTask: () => void }> = props => {
  const dispatch = useDispatch();
  const taskItems = useSelector((state: RootState) => state.task.data);
  const taskTagItems = useSelector((state: RootState) => state.task.task_tags);
  const tagItems = useSelector((state: RootState) => state.task.tags);
  const filters = useSelector((state: RootState) => state.task.filters);
  const callUpdate = useSelector((state: RootState) => state.task.callUpdate);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const [sortBy, setSortBy] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  const filteredTasks = taskTagItems.filter(item => filters.includes(item.tag_id || -1));
  const filteredTaskIds = filteredTasks.map(item => item.task_id);

  let toDoArray = taskItems.filter(item => item.state == 'To Do' && (filteredTaskIds.includes(item.id) || !filters.length));
  let inProgressArray = taskItems.filter(item => item.state == 'In Progress' && (filteredTaskIds.includes(item.id) || !filters.length));
  let completedArray = taskItems.filter(item => item.state == 'Completed' && (filteredTaskIds.includes(item.id) || !filters.length));

  const sortKey = sortBy.length !== 0 ? sortBy : 'dueDate';
  toDoArray = _.sortBy(toDoArray, [sortKey]);
  inProgressArray = _.sortBy(inProgressArray, [sortKey]);
  completedArray = _.sortBy(completedArray, [sortKey]);

  toDoArray = toDoArray.filter(item => item.title!.toUpperCase().includes(searchInput.toUpperCase()));
  inProgressArray = inProgressArray.filter(item => item.title!.toUpperCase().includes(searchInput.toUpperCase()));
  completedArray = completedArray.filter(item => item.title!.toUpperCase().includes(searchInput.toUpperCase()));

  const handelSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const convertISODate = (isoString: string) => {
    const date = moment(isoString);
    const dateString = date.format('ddd D/MM @ hh:mm A');
    return dateString;
  };

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

  const getTags = async () => {
    const response = await fetch(Routes.url + '/tags', {
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
      console.log('Calling Update');
      const tagResponse = await getTags();
      const tagData = await tagResponse.json();

      const taskResponse = await getTasks();
      const taskData = await taskResponse.json();

      if (callUpdate.isTagDelete) {
        dispatch(taskActions.updateTasks({ data: taskData.data }));
        dispatch(taskActions.updateTaskTags({ data: taskData.tag }));
        dispatch(taskActions.updateTags({ data: tagData.data }));
        return;
      }
      dispatch(taskActions.updateTags({ data: tagData.data }));
      dispatch(taskActions.updateTasks({ data: taskData.data }));
      dispatch(taskActions.updateTaskTags({ data: taskData.tag }));
    })();
  }, [callUpdate]);

  return (
    <div className={classes.taskView}>
      <div className={classes.createTask}>
        <p>All Tasks</p>
        <div className={classes.addAndSearch}>
          <AddTaskButton onShowAddTask={props.onShowAddTask} />
          <Search value={searchInput} onChange={handleSearchInput} />
          <select defaultValue='' onChange={handelSortBy}>
            <option value='' disabled hidden>
              Sort
            </option>
            <option value='dueDate'>By Due Date</option>
            <option value='title'>By Title</option>
          </select>
        </div>
      </div>
      <div className={classes.taskCards}>
        <TaskCard noOfTask={toDoArray.length} state='To do'>
          {toDoArray.map(item => (
            <TaskItem
              key={item.id}
              due_date={convertISODate(item.dueDate || '')}
              task_id={{ id: item.id || -1 }}
              tags={tagItems}
              task_tags={taskTagItems.filter(tagItem => tagItem.task_id == item.id)}
              title={item.title || ''}
              description={item.description || ''}
            />
          ))}
        </TaskCard>

        <TaskCard noOfTask={inProgressArray.length} state='In progress'>
          {inProgressArray.map(item => (
            <TaskItem
              key={item.id}
              due_date={convertISODate(item.dueDate || '')}
              task_id={{ id: item.id || -1 }}
              tags={tagItems}
              task_tags={taskTagItems.filter(tagItem => tagItem.task_id == item.id)}
              title={item.title || ''}
              description={item.description || ''}
            />
          ))}
        </TaskCard>
        <TaskCard noOfTask={completedArray.length} state='Completed'>
          {completedArray.map(item => (
            <TaskItem
              key={item.id}
              due_date={convertISODate(item.dueDate || '')}
              task_id={{ id: item.id || -1 }}
              tags={tagItems}
              task_tags={taskTagItems.filter(tagItem => tagItem.task_id == item.id)}
              title={item.title || ''}
              description={item.description || ''}
            />
          ))}
        </TaskCard>
      </div>
    </div>
  );
};

export default TaskView;
