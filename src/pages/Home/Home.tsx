import React, { useState } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import MainBody from '../../components/UI/MainBody/MainBody';
import TaskView from '../../components/Task/TaskView';
import AddTask from '../../components/Task/AddTask/AddTask';
import AddTag from '../../components/AddTag/AddTag';

function Home() {
  const [addTaskShown, setAddTaskShown] = useState<boolean>(false);
  const [addTagShown, setAddTagShown] = useState<boolean>(false);

  const showAddTaskHandler = () => {
    setAddTaskShown(true);
  };
  const hideAddTaskHandler = () => {
    setAddTaskShown(false);
  };

  const showAddTagHandler = () => {
    setAddTagShown(true);
  };
  const hideAddTagHandler = () => {
    setAddTagShown(false);
  };

  return (
    <MainBody>
      {addTagShown && <AddTag onCancel={hideAddTagHandler} />}
      {addTaskShown && <AddTask onCancel={hideAddTaskHandler} />}
      <SideNav onShowAddTag={showAddTagHandler} />
      <TaskView onShowAddTask={showAddTaskHandler} />
    </MainBody>
  );
}

export default Home;
