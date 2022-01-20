import React from 'react';
import AddTaskModal from '../../UI/Modal/AddTaskModal';
import ChooseTag from './ChooseTag';
import classes from './AddTask.module.css';

const AddTask: React.FC<{ onCancel: () => void }> = props => {
  let currentDate = new Date().toISOString().replace('Z', '');
  currentDate = currentDate.substring(0, currentDate.indexOf('.') - 3);
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };
  return (
    <AddTaskModal onCancel={props.onCancel}>
      <form onSubmit={onSubmitHandler} className={classes.addTaskForm}>
        <label>Task</label>
        <input type='text' />
        <label>Description</label>
        <br />
        <textarea></textarea>
        <ChooseTag />
        <select>
          <option>To do</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <label>Due Date (date and time):</label>
        <input min={currentDate} type='datetime-local' />
        <div className={classes.submitForm}>
          <button className={classes.add} type='submit'>
            Submit
          </button>
          <button onClick={props.onCancel} className={classes.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </AddTaskModal>
  );
};

export default AddTask;
