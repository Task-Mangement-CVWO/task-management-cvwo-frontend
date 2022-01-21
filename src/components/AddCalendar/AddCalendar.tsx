import React from 'react';
import classes from './AddCalendar.module.css';
import AddTagModal from '../UI/Modal/AddTagModal';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { RootState } from '../../store';
import JwtUtils from '../../utilities/jwt';
import Routes from '../../utilities/routes';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import stepOneImg from './calendarStepOne.png';
import stepTwoImg from './calendarStepTwo.png';
import stepThreeImg from './calendarStepThree.png';

const AddCalendar: React.FC<{ onCancel: () => void }> = props => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const username = JwtUtils.getPayload(accessToken).username;
  const dispatch = useDispatch();
  const copyHandler = () => {
    navigator.clipboard.writeText(Routes.calendarUrl + '/cvwo/api/calendarsubscription/' + username);
    dispatch(uiActions.showNotification({ status: 'success', message: 'Link Copied!', title: 'Success' }));
  };
  return (
    <AddTagModal onCancel={props.onCancel}>
      <div className={classes.container}>
        <h1>Online Calendar Subscription Link</h1>
        <p onClick={copyHandler} className={classes.link}>
          {Routes.calendarUrl + '/cvwo/api/calendarsubscription/' + username}
          &nbsp;&nbsp;
          <FontAwesomeIcon icon={faCopy} size='1x' />
        </p>
        <br />
        <label>How do you subscribe to a calendar?</label>
        <div className={classes.tutorial}>
          <p>Step 1</p>
          <label>Navigate to your applications subscription option</label>
          <img src={stepOneImg} width={'100%'} />

          <p>Step 2</p>
          <label>Copy paste the above URL inside</label>
          <img src={stepTwoImg} width={'100%'} />

          <p>Step 3</p>
          <label>Pick and choose your options. Below is the recommended options.</label>
          <img src={stepThreeImg} width={'100%'} />
        </div>
      </div>
    </AddTagModal>
  );
};

export default AddCalendar;
