import React from 'react';
import classes from './AddTaskButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const AddTaskButton: React.FC<{ onShowAddTask: () => void }> = props => {
  return (
    <div className={classes.btnHover}>
      <button onClick={props.onShowAddTask} className={classes.button}>
        <FontAwesomeIcon icon={faPlusCircle} size='1x' /> Add Task
      </button>
    </div>
  );
};

export default AddTaskButton;
