import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { isPropertySignature } from 'typescript';
import classes from './Modal.module.css';

const Backdrop: React.FC<{ onCancel: () => void }> = props => {
  return <div onClick={props.onCancel} className={classes.backdrop}></div>;
};

const ModalOverlay: React.FC = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal: React.FC<{ onCancel: () => void }> = props => {
  return (
    <Fragment>
      {portalElement && ReactDOM.createPortal(<Backdrop onCancel={props.onCancel} />, portalElement)}
      {portalElement && ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
