import React from 'react';
import TagItem from './TagItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import classes from './ChooseTag.module.css';

const ChooseTag = () => {
  const tags = useSelector((state: RootState) => state.task.tags);

  return (
    <div className={classes.container}>
      <p>Choose a tag</p>
      <div className={classes.tags}>
        {tags.map(item => (
          <TagItem key={item.id} title={item.title || ''} tag_id={{ id: item.id || -1 }} />
        ))}
      </div>
    </div>
  );
};

export default ChooseTag;
