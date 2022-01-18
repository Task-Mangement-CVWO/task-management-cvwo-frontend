import React from 'react';
import classes from './AddTag.module.css';
import AddTagModal from '../UI/Modal/AddTagModal';

const AddTag: React.FC<{ onCancel: () => void }> = props => {
  return (
    <AddTagModal onCancel={props.onCancel}>
      <form className={classes.addTagForm}>
        <label>Tag Name</label>
        <input type='text' />
        <div className={classes.submitForm}>
          <button className={classes.add} type='submit'>
            Submit
          </button>
          <button onClick={props.onCancel} className={classes.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </AddTagModal>
  );
};

export default AddTag;
