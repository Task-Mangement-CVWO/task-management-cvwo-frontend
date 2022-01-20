import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../../store/task-slice';
import { RootState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import Routes from '../../utilities/routes';
import { uiActions } from '../../store/ui-slice';
import classes from './TagItem.module.css';

const TagItem: React.FC<{ title: string; tag_id: { id: number } }> = props => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.task.filters);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [tagTitle, setTagTitle] = useState<string>(props.title);
  const tagInputText = useRef<HTMLInputElement>(null);

  let filtersArr = [...filters];

  const setActiveHandler = () => {
    if (isEditable) {
      return;
    }
    setIsActive(state => !state);
    if (!filtersArr.includes(props.tag_id.id) && !isActive) {
      filtersArr.push(props.tag_id.id);
      dispatch(taskActions.updateFilters({ data: filtersArr }));
    }
    if (isActive) {
      filtersArr = [...filtersArr.filter(e => e !== props.tag_id.id)];
      dispatch(taskActions.updateFilters({ data: filtersArr }));
    }
  };

  const deleteTag = async (id: number) => {
    const response = await fetch(Routes.url + '/tags/' + id.toString(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': accessToken,
      },
    });
    return response;
  };

  const editTag = async (title: string, id: number) => {
    const response = await fetch(Routes.url + '/tags/' + id.toString(), {
      method: 'PUT',
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

  const deleteHandler = async () => {
    dispatch(uiActions.showNotification({ status: 'pending', message: 'Deleting...', title: 'Pending' }));
    const response = await deleteTag(props.tag_id.id);
    if (!response.ok) {
      type error = { message: string };
      const data = (await response.json()) as unknown as error;
      dispatch(uiActions.showNotification({ status: 'error', message: data.message, title: 'Error' }));
      return;
    }
    dispatch(uiActions.showNotification({ status: 'success', message: 'Data Successfully Deleted', title: 'Success' }));
    dispatch(taskActions.callUpdate({ data: { isUpdate: true, isTagDelete: true } }));
    return;
  };

  const editTask = async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newTagTitle = tagInputText.current!.value;
    setTagTitle(newTagTitle);
    setIsEditable(false);
    const response = await editTag(newTagTitle, props.tag_id.id);
    if (!response.ok) {
      type error = { message: string };
      const data = (await response.json()) as unknown as error;
      dispatch(uiActions.showNotification({ status: 'error', message: data.message, title: 'Error' }));
      return;
    }
    dispatch(taskActions.callUpdate({ data: { isUpdate: true, isTagDelete: true } }));
  };

  return (
    <li onClick={setActiveHandler} className={`${classes.navButton} ${isActive && classes.selected}`}>
      {isActive && !isEditable && <FontAwesomeIcon className={classes.edit} onClick={() => setIsEditable(true)} icon={faEdit} size='1x' />}
      &nbsp;&nbsp;
      {isActive && !isEditable && <FontAwesomeIcon className={classes.delete} onClick={deleteHandler} icon={faMinusCircle} size='1x' />}
      &nbsp;&nbsp;
      {!isEditable && tagTitle}
      {isEditable && (
        <input
          autoFocus
          ref={tagInputText}
          onFocus={e => e.target.select()}
          onBlur={editTask}
          className={classes.input}
          defaultValue={tagTitle}
        />
      )}
    </li>
  );
};

export default TagItem;
