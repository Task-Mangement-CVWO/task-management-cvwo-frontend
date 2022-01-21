import React from 'react';
import classes from './AddTaskButton.module.css';
import { taskActions } from '../../store/task-slice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const AddTaskButton: React.FC<{ onShowAddTask: () => void }> = props => {
  const dispatch = useDispatch();
  const onShowAddTaskhandler = () => {
    dispatch(taskActions.updateAddTaskTags({ data: [] }));
    props.onShowAddTask();
  };
  return (
    <div className={classes.btnHover}>
      <button onClick={onShowAddTaskhandler} className={classes.button}>
        <FontAwesomeIcon icon={faPlusCircle} size='1x' /> Add Task
      </button>
    </div>
  );
};

export default AddTaskButton;
