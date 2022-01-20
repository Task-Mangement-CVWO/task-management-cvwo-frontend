import React, { useRef } from 'react';
import classes from './AddTag.module.css';
import AddTagModal from '../UI/Modal/AddTagModal';
import Routes from '../../utilities/routes';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { uiActions } from '../../store/ui-slice';
import { taskActions } from '../../store/task-slice';

const AddTag: React.FC<{ onCancel: () => void }> = props => {
  const dispatch = useDispatch();
  const tagInputText = useRef<HTMLInputElement>(null);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const addTag = async (title: string) => {
    const response = await fetch(Routes.url + '/tags', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
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
    dispatch(uiActions.showNotification({ status: 'pending', message: 'Adding...', title: 'Pending' }));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const title = tagInputText.current!.value;
    if (title.trim().length == 0) {
      dispatch(uiActions.showNotification({ status: 'error', message: 'Input cannot be empty', title: 'Error' }));
      return;
    }
    const response = await addTag(title);
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
  return (
    <AddTagModal onCancel={props.onCancel}>
      <form onSubmit={onSubmitHandler} className={classes.addTagForm}>
        <label>Tag Name</label>
        <input ref={tagInputText} type='text' />
        <div className={classes.submitForm}>
          <button className={classes.add} type='submit'>
            Submit
          </button>
          <button onClick={props.onCancel} className={classes.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </AddTagModal>
  );
};

export default AddTag;
