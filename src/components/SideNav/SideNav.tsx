import React from 'react';
import classes from './SideNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faSignOutAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Tags from './Tags';

const SideNav: React.FC<{ onShowAddTag: () => void }> = props => {
  return (
    <div className={classes.sideNav}>
      <br />
      <div className={`${classes.selected} ${classes.navButton} ${classes.allTasks}`}>
        <FontAwesomeIcon icon={faTasks} size='1x' /> &nbsp;&nbsp; All Tasks
      </div>
      <div onClick={props.onShowAddTag} className={`${classes.sideNavButton} ${classes.addTag}`}>
        <FontAwesomeIcon icon={faPlusCircle} size='1x' /> &nbsp;&nbsp; Add Tag
      </div>
      <Tags />

      <div className={`${classes.sideNavButton} ${classes.logout}`}>
        <FontAwesomeIcon icon={faSignOutAlt} size='1x' /> &nbsp;&nbsp; Logout
      </div>
    </div>
  );
};

export default SideNav;
