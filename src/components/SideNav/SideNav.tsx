import React from 'react';
import classes from './SideNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Tags from './Tags';

const SideNav = () => {
  return (
    <div className={classes.sideNav}>
      <br />
      <div className={`${classes.selected} ${classes.navButton} ${classes.allTasks}`}>
        <FontAwesomeIcon icon={faTasks} size='1x' /> &nbsp;&nbsp; All Tasks
      </div>

      <Tags />

      <div className={classes.logout}>
        <FontAwesomeIcon icon={faSignOutAlt} size='1x' /> &nbsp;&nbsp; Logout
      </div>
    </div>
  );
};

export default SideNav;
