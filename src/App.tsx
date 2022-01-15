import React, { useState } from 'react';
import SideNav from './components/SideNav/SideNav';
import MainBody from './components/UI/MainBody/MainBody';
import TaskView from './components/Task/TaskView';
import AddTask from './components/Task/AddTask/AddTask';

function App() {
  const [addTaskShown, setAddTaskShown] = useState<boolean>(false);

  const showAddTaskHandler = () => {
    setAddTaskShown(true);
  };

  const hideAddTaskHandler = () => {
    setAddTaskShown(false);
  };

  return (
    <MainBody>
      {addTaskShown && <AddTask onCancel={hideAddTaskHandler} />}
      <SideNav />
      <TaskView onShowAddTask={showAddTaskHandler} />
    </MainBody>
  );
}

export default App;
