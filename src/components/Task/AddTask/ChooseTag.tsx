import React from 'react';
import TagItem from './TagItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import classes from './ChooseTag.module.css';

const ChooseTag: React.FC<{ selectedItems: number[] }> = props => {
  const tags = useSelector((state: RootState) => state.task.tags);
  const selectedTags = tags.map(item => ({ ...item, selected: props.selectedItems.includes(item.id || -1) }));
  return (
    <div className={classes.container}>
      <p>Choose a tag</p>
      <div className={classes.tags}>
        {selectedTags.map(item => (
          <TagItem key={item.id} selected={item.selected} title={item.title || ''} tag_id={{ id: item.id || -1 }} />
        ))}
      </div>
    </div>
  );
};

export default ChooseTag;
