/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState } from 'react';
import AddTaskModal from '../../UI/Modal/AddTaskModal';
import ChooseTag from './ChooseTag';
import classes from './AddTask.module.css';
import Routes from '../../../utilities/routes';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { uiActions } from '../../../store/ui-slice';
import { taskActions } from '../../../store/task-slice';
import moment from 'moment';

const AddTask: React.FC<{ onCancel: () => void }> = props => {
  const dispatch = useDispatch();

  let currentDate = new Date().toISOString().replace('Z', '');
  currentDate = currentDate.substring(0, currentDate.indexOf('.') - 3);

  const taskInput = useRef<HTMLInputElement>(null);
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const stateInput = useRef<HTMLSelectElement>(null);
  const dateTimeInput = useRef<HTMLInputElement>(null);
  const chooseTags = useSelector((state: RootState) => state.task.addTaskTags);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const addTask = async (taskValue: string, descriptionValue: string, stateValue: string, dateTimeValue: string, chooseTags: number[]) => {
    const response = await fetch(Routes.url + '/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title: taskValue,
        description: descriptionValue,
        state: stateValue,
        dueDate: dateTimeValue,
        tags: chooseTags,
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': accessToken,
      },
    });
    return response;
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(uiActions.showNotification({ status: 'pending', message: 'Adding Task...', title: 'Pending' }));
    const taskValue = taskInput.current!.value;
    const stateValue = stateInput.current!.value;
    const dateTimeValue = dateTimeInput.current!.value;

    const isTaskValue = taskValue.length !== 0;
    const isDescriptionValue = descriptionValue.length !== 0;
    const isStateValue = stateValue.length !== 0;
    const isDateTimeValue = moment(dateTimeValue).isValid();

    if (!isTaskValue || !isDescriptionValue || !isStateValue || !isDateTimeValue) {
      dispatch(uiActions.showNotification({ status: 'error', message: 'Input cannot be empty', title: 'Error' }));
      return;
    }
    if (taskValue.length > 20) {
      dispatch(
        uiActions.showNotification({ status: 'error', message: 'Title length cannot be greater than 20 Chracters', title: 'Error' }),
      );
      return;
    }

    const response = await addTask(taskValue, descriptionValue, stateValue, dateTimeValue, chooseTags);
    if (!response.ok) {
      type error = { message: string };
      const data = (await response.json()) as unknown as error;
      dispatch(uiActions.showNotification({ status: 'error', message: data.message, title: 'Error' }));
      return;
    }
    dispatch(uiActions.showNotification({ status: 'success', message: 'Tag Added!', title: 'Success' }));
    dispatch(taskActions.callUpdate({ data: { isUpdate: true, isTagDelete: false } }));
    props.onCancel();
  };
  const descriptionHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value);
  };
  return (
    <AddTaskModal onCancel={props.onCancel}>
      <form onSubmit={onSubmitHandler} className={classes.addTaskForm}>
        <label>Task</label>
        <input ref={taskInput} type='text' />
        <label>Description</label>
        <br />
        <textarea value={descriptionValue} onChange={descriptionHandler} />
        <ChooseTag />
        <select defaultValue='To Do' ref={stateInput}>
          <option value='To Do'>To do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>
        <label>Due Date (date and time):</label>
        <input ref={dateTimeInput} min={currentDate} type='datetime-local' />
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
