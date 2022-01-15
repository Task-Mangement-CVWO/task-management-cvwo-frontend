import React from 'react';
import TagItem from './TagItem';
import classes from './ChooseTag.module.css';

const ChooseTag = () => {
  return (
    <div className={classes.container}>
      <p>Choose a tag</p>
      <div className={classes.tags}>
        <TagItem />
        <TagItem />
      </div>
    </div>
  );
};

export default ChooseTag;
