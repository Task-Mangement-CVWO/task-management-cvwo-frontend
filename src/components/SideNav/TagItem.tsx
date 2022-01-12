import React, { useState } from 'react';
import classes from './TagItem.module.css';

const TagItem: React.FC<{ title: string }> = props => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const setActiveHandler = () => {
    setIsActive(state => !state);
  };

  return (
    <li onClick={setActiveHandler} className={`${classes.navButton} ${isActive && classes.selected}`}>
      {props.title}
    </li>
  );
};

export default TagItem;
