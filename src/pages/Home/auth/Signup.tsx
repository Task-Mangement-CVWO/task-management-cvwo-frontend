import React, { Fragment } from 'react';
import SignupForm from '../../../components/Auth/SignupForm';
import MainBody from '../../../components/UI/MainBody/MainBody';

const Signup = () => {
  return (
    <Fragment>
      <MainBody>
        <SignupForm />
      </MainBody>
    </Fragment>
  );
};

export default Signup;
