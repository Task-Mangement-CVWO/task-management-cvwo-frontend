import React from 'react';
import SideNav from './components/SideNav/SideNav';
import MainBody from './components/UI/MainBody/MainBody';
import TaskView from './components/Task/TaskView';

function App() {
  return (
    <MainBody>
      <SideNav />
      <TaskView />
    </MainBody>
  );
}

export default App;
