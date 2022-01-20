import React from 'react';
import TagItem from './TagItem';
import classes from './TaskItem.module.css';

const TaskItem: React.FC<{
  title: string;
  description: string;
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
  return (
    <li className={classes.container}>
      <div className={classes.delete}>-</div>
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
