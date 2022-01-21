import React from 'react';
import classes from './SideNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { authActions } from '../../store/auth-slice';
import { uiActions } from '../../store/ui-slice';
import { faTasks, faSignOutAlt, faPlusCircle, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import Tags from './Tags';
import { RootState } from '../../store';

const SideNav: React.FC<{ onShowAddTag: () => void; onAddCalendar: () => void }> = props => {
  const dispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.task.tags);
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(uiActions.showNotification({ status: 'success', message: 'Successfully Logged Out', title: 'Success' }));
    history.push('/auth/login');
  };
  return (
    <div className={classes.sideNav}>
      <br />
      <div className={`${classes.selected} ${classes.navButton} ${classes.allTasks}`}>
        <FontAwesomeIcon icon={faTasks} size='1x' /> &nbsp;&nbsp; All Tasks
      </div>
      <div onClick={props.onShowAddTag} className={`${classes.sideNavButton} ${classes.addTag}`}>
        <FontAwesomeIcon icon={faPlusCircle} size='1x' /> &nbsp;&nbsp; Add Tags
      </div>
      <div onClick={props.onAddCalendar} className={`${classes.sideNavButton} ${classes.subscribeTag}`}>
        <FontAwesomeIcon icon={faCalendarPlus} size='1x' /> &nbsp;&nbsp; Subscribe
      </div>
      <Tags items={tags} />
      <div onClick={logoutHandler} className={`${classes.sideNavButton} ${classes.logout}`}>
        <FontAwesomeIcon icon={faSignOutAlt} size='1x' /> &nbsp;&nbsp; Logout
      </div>
    </div>
  );
};

export default SideNav;
