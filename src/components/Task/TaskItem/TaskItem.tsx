import React from 'react';
import TagItem from './TagItem';
import classes from './TaskItem.module.css';
import Routes from '../../../utilities/routes';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { taskActions } from '../../../store/task-slice';
import { uiActions } from '../../../store/ui-slice';

const TaskItem: React.FC<{
  title: string;
  description: string;
  task_id: { id: number };
  task_tags: {
    id?: number;
    user_id?: number;
    tag_id?: number;
    task_id?: number;
    created_at?: string;
    updated_at?: string;
  }[];
  tags: {
    id?: number;
    title?: string;
    user_id?: number;
    created_at?: string;
    updated_at?: string;
  }[];
}> = props => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const deleteTask = async (id: number) => {
    const response = await fetch(Routes.url + '/tasks/' + id.toString(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': accessToken,
      },
    });
    return response;
  };

  const handleDelete = async () => {
    dispatch(uiActions.showNotification({ status: 'pending', message: 'Deleting...', title: 'Pending' }));
    const response = await deleteTask(props.task_id.id);
    if (!response.ok) {
      type error = { message: string };
      const data = (await response.json()) as unknown as error;
      dispatch(uiActions.showNotification({ status: 'error', message: data.message, title: 'Error' }));
      return;
    }
    dispatch(uiActions.showNotification({ status: 'success', message: 'Data Successfully Deleted', title: 'Success' }));
    dispatch(taskActions.callUpdate({ data: { isUpdate: true, isTagDelete: false } }));
    return;
  };

  return (
    <li className={classes.container}>
      <div onClick={handleDelete} className={classes.delete}>
        -
      </div>
      <p>{props.title}</p>
      <label>{props.description}</label>
      <div className={classes.tags}>
        {props.task_tags.map(item => (
          <TagItem key={item.id} title={props.tags.filter(tagItem => tagItem.id == item.tag_id)[0].title || ''} />
        ))}
      </div>
    </li>
  );
};

export default TaskItem;
