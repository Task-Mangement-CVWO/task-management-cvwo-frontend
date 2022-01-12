import React from 'react';
import TagItem from './TagItem';
import classes from './Tags.module.css';

const Tags = () => {
  return (
    <div className={classes.tagContainer}>
      <ul>
        <TagItem title={'DSC'} />
        <TagItem title={'CP3108'} />
        <TagItem title={'ST2131'} />
        <TagItem title={'CS2030S'} />
        <TagItem title={'CS2040S'} />
        <TagItem title={'MA2001'} />
        <TagItem title={'GESS1002'} />
        <TagItem title={'GEX1007'} />
      </ul>
    </div>
  );
};

export default Tags;
