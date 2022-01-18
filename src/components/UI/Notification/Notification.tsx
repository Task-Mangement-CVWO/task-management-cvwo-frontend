import React from 'react';
import classes from './Notification.module.css';

const Notification: React.FC<{ status: string; title: string; message: string }> = props => {
  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <div className={cssClasses}>
      {props.title}
      <br />
      {props.message}
    </div>
  );
};

export default Notification;
