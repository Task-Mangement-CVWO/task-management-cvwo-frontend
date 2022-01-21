/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState, useEffect } from 'react';
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
  const offset = new Date().getTimezoneOffset();

  let currentDate = moment(new Date()).subtract(offset, 'minutes').toISOString().replace('Z', '');
  currentDate = currentDate.substring(0, currentDate.indexOf('.') - 3);

  const [minDate, setMinDate] = useState(currentDate);

  const taskInput = useRef<HTMLInputElement>(null);
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const stateInput = useRef<HTMLSelectElement>(null);
  const dateTimeInput = useRef<HTMLInputElement>(null);
  const chooseTags = useSelector((state: RootState) => state.task.addTaskTags);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const onEdit = useSelector((state: RootState) => state.task.editingTask);
  const [onEditFormValues, setOnEditFormValues] = useState({
    id: -1,
    title: '',
    description: '',
    dueDate: '',
    state: 'To Do',
  });

  const fetchTask = async (taskId: number) => {
    const response = await fetch(Routes.url + '/tasks/' + taskId.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': accessToken,
      },
    });
    return response;
  };

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

  const editTask = async (
    id: number,
    taskValue: string,
    descriptionValue: string,
    stateValue: string,
    dateTimeValue: string,
    chooseTags: number[],
  ) => {
    const response = await fetch(Routes.url + '/tasks/' + id.toString(), {
      method: 'PUT',
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

  useEffect(() => {
    (async () => {
      if (!onEdit.isEditingTask) {
        setDescriptionValue('');
        taskInput.current!.value = '';
        stateInput.current!.value = 'To Do';
        dateTimeInput.current!.value = '';
        dispatch(taskActions.updateAddTaskTags({ data: [] }));
        return;
      }
      dispatch(uiActions.showNotification({ status: 'pending', message: 'Fetching Data...', title: 'Pending' }));
      const response = await fetchTask(onEdit.taskId);
      const data = await response.json();
      const currentDateTimeObj = moment(currentDate).add(offset, 'minutes');
      const taskDateTimeObj = moment(data.data.dueDate);
      let minDate = moment.min(taskDateTimeObj, currentDateTimeObj).subtract(offset, 'minutes').toISOString();
      minDate = minDate.replace('Z', '');
      minDate = minDate.substring(0, minDate.indexOf('.') - 3);
      setMinDate(minDate);

      let taskDueDate =
        currentDateTimeObj > taskDateTimeObj ? taskDateTimeObj.toISOString() : taskDateTimeObj.subtract(offset, 'minutes').toISOString();
      taskDueDate = taskDueDate.replace('Z', '');
      taskDueDate = taskDueDate.substring(0, taskDueDate.indexOf('.') - 3);

      setDescriptionValue(data.data.description);
      taskInput.current!.value = data.data.title;
      stateInput.current!.value = data.data.state;
      dateTimeInput.current!.value = taskDueDate;

      dispatch(uiActions.showNotification({ status: 'success', message: 'Data Fetched', title: 'Success' }));

      setOnEditFormValues({
        id: data.data.id,
        title: data.data.title,
        description: data.data.description,
        dueDate: taskDueDate,
        state: data.data.state,
      });
    })();
  }, []);

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const pendingTxt = onEdit.isEditingTask ? 'Editing Task...' : 'Adding Task...';
    const successTxt = onEdit.isEditingTask ? 'Task Edited' : 'Task Added';
    dispatch(uiActions.showNotification({ status: 'pending', message: pendingTxt, title: 'Pending' }));
    const taskValue = taskInput.current!.value;
    const stateValue = stateInput.current!.value;
    const dateTimeValue = dateTimeInput.current!.value;

    const isTaskValue = taskValue.length !== 0;
    const isStateValue = stateValue.length !== 0;
    const isDateTimeValue = moment(dateTimeValue).isValid();

    if (!isTaskValue || !isStateValue || !isDateTimeValue) {
      dispatch(uiActions.showNotification({ status: 'error', message: 'Input cannot be empty', title: 'Error' }));
      return;
    }
    if (taskValue.length > 20) {
      dispatch(
        uiActions.showNotification({ status: 'error', message: 'Title length cannot be greater than 20 Chracters', title: 'Error' }),
      );
      return;
    }
    const response = onEdit.isEditingTask
      ? await editTask(onEditFormValues.id, taskValue, descriptionValue, stateValue, dateTimeValue, chooseTags)
      : await addTask(taskValue, descriptionValue, stateValue, dateTimeValue, chooseTags);
    if (!response.ok) {
      type error = { message: string };
      const data = (await response.json()) as unknown as error;
      console.log(data);
      dispatch(uiActions.showNotification({ status: 'error', message: data.message, title: 'Error' }));
      return;
    }
    dispatch(uiActions.showNotification({ status: 'success', message: successTxt, title: 'Success' }));
    dispatch(taskActions.callUpdate({ data: { isUpdate: true, isTagDelete: false } }));
    if (onEdit.isEditingTask) {
      dispatch(taskActions.updateIsEditingTask({ data: { isEditingTask: false, id: -1 } }));
    }
    props.onCancel();
  };
  const descriptionHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value);
  };

  const onCancelHandler = () => {
    props.onCancel();
    dispatch(taskActions.updateIsEditingTask({ data: { isEditingTask: false, id: -1 } }));
  };

  return (
    <AddTaskModal onCancel={onCancelHandler}>
      <form onSubmit={onSubmitHandler} className={classes.addTaskForm}>
        <label>Task</label>
        <input ref={taskInput} type='text' />
        <label>Description</label>
        <br />
        <textarea value={descriptionValue} onChange={descriptionHandler} />
        <ChooseTag selectedItems={chooseTags} />
        <select defaultValue='To Do' ref={stateInput}>
          <option value='To Do'>To do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>
        <label>Due Date (date and time):</label>
        <input ref={dateTimeInput} min={minDate} type='datetime-local' />
        <div className={classes.submitForm}>
          <button className={classes.add} type='submit'>
            Submit
          </button>
          <button onClick={onCancelHandler} className={classes.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </AddTaskModal>
  );
};

export default AddTask;
