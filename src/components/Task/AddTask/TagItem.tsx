import React, { useState } from 'react';
import classes from './TagItem.module.css';

const TagItem = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const setActiveHandler = () => {
    setIsActive(state => !state);
  };
  return (
    <div onClick={setActiveHandler} className={`${classes.tag} ${isActive && classes.selected}`}>
      CS2030S
    </div>
  );
};

export default TagItem;
