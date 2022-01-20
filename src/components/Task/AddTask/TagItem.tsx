import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { taskActions } from '../../../store/task-slice';
import { RootState } from '../../../store';
import classes from './TagItem.module.css';

const TagItem: React.FC<{ title: string; tag_id: { id: number } }> = props => {
  const dispatch = useDispatch();
  const taskTags = useSelector((state: RootState) => state.task.addTaskTags);
  let taskTagsArr = [...taskTags];
  const [isActive, setIsActive] = useState<boolean>(false);

  const setActiveHandler = () => {
    setIsActive(state => !state);
    if (!taskTagsArr.includes(props.tag_id.id) && !isActive) {
      taskTagsArr.push(props.tag_id.id);
      dispatch(taskActions.updateAddTaskTags({ data: taskTagsArr }));
    }
    if (isActive) {
      taskTagsArr = [...taskTagsArr.filter(e => e !== props.tag_id.id)];
      dispatch(taskActions.updateAddTaskTags({ data: taskTagsArr }));
    }
  };

  return (
    <div onClick={setActiveHandler} className={`${classes.tag} ${isActive && classes.selected}`}>
      {props.title}
    </div>
  );
};

export default TagItem;
