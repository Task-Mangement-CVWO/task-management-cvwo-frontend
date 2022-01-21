import React, { useState } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import MainBody from '../../components/UI/MainBody/MainBody';
import TaskView from '../../components/Task/TaskView';
import AddTask from '../../components/Task/AddTask/AddTask';
import AddTag from '../../components/AddTag/AddTag';
import AddCalendar from '../../components/AddCalendar/AddCalendar';

function Home() {
  const [addTaskShown, setAddTaskShown] = useState<boolean>(false);
  const [addTagShown, setAddTagShown] = useState<boolean>(false);
  const [addCalendarShown, setAddCalendarShown] = useState<boolean>(false);

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

  const showAddCalendarHandler = () => {
    setAddCalendarShown(true);
  };
  const hideAddCalendarHandler = () => {
    setAddCalendarShown(false);
  };

  return (
    <MainBody>
      {addTagShown && <AddTag onCancel={hideAddTagHandler} />}
      {addTaskShown && <AddTask onCancel={hideAddTaskHandler} />}
      {addCalendarShown && <AddCalendar onCancel={hideAddCalendarHandler} />}
      <SideNav onAddCalendar={showAddCalendarHandler} onShowAddTag={showAddTagHandler} />
      <TaskView onShowAddTask={showAddTaskHandler} />
    </MainBody>
  );
}

export default Home;
