import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../../store/task-slice';
import { RootState } from '../../store';
import classes from './TagItem.module.css';

const TagItem: React.FC<{ title: string; tag_id: { id: number } }> = props => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.task.filters);
  let filtersArr = [...filters];
  const [isActive, setIsActive] = useState<boolean>(false);

  const setActiveHandler = () => {
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
  return (
    <li onClick={setActiveHandler} className={`${classes.navButton} ${isActive && classes.selected}`}>
      {props.title}
    </li>
  );
};

export default TagItem;
