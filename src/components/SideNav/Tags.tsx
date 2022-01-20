import React from 'react';
import TagItem from './TagItem';
import classes from './Tags.module.css';
import _ from 'lodash';

const Tags: React.FC<{
  items: {
    id?: number;
    title?: string;
    user_id?: number;
    created_at?: string;
    updated_at?: string;
  }[];
}> = props => {
  let tags = props.items;
  tags = _.sortBy(tags, ['title']);
  console.log(props.items);
  return (
    <div className={classes.tagContainer}>
      <ul>
        {tags.map(tagItem => (
          <TagItem key={tagItem.id} tag_id={{ id: tagItem.id || -1 }} title={tagItem.title || ''} />
        ))}
      </ul>
    </div>
  );
};

export default Tags;
