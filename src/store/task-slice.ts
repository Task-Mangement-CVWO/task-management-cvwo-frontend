import { createSlice } from '@reduxjs/toolkit';

interface SliceState {
  data: {
    id?: number;
    user_id?: number;
    title?: string;
    description?: string;
    dueDate?: string;
    state?: string;
    created_at?: string;
    updated_at?: string;
  }[];
  task_tags: {
    id?: number;
    user_id?: number;
    tag_id?: number;
    task_id?: number;
    created_at?: string;
    updated_at?: string;
  }[];
  tags: {
    id?: number;
    title?: string;
    user_id?: number;
    created_at?: string;
    updated_at?: string;
  }[];
  filters: number[];
  addTaskTags: number[];
  callUpdate: {
    isUpdate: boolean;
    isTagDelete: boolean;
  };
  editingTask: {
    isEditingTask: boolean;
    taskId: number;
  };
}

const initialState: SliceState = {
  data: [
    {
      id: undefined,
      user_id: undefined,
      title: undefined,
      dueDate: undefined,
      state: undefined,
      created_at: undefined,
      updated_at: undefined,
    },
  ],
  task_tags: [
    {
      id: undefined,
      user_id: undefined,
      tag_id: undefined,
      task_id: undefined,
      created_at: undefined,
      updated_at: undefined,
    },
  ],
  tags: [
    {
      id: undefined,
      user_id: undefined,
      title: undefined,
      created_at: undefined,
      updated_at: undefined,
    },
  ],
  filters: [],
  addTaskTags: [],
  callUpdate: {
    isUpdate: false,
    isTagDelete: false,
  },
  editingTask: {
    isEditingTask: false,
    taskId: -1,
  },
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTasks(state, action) {
      state.data = action.payload.data;
    },
    updateTaskTags(state, action) {
      state.task_tags = action.payload.data;
    },
    updateTags(state, action) {
      state.tags = action.payload.data;
    },
    updateFilters(state, action) {
      state.filters = action.payload.data;
    },
    updateAddTaskTags(state, action) {
      state.addTaskTags = action.payload.data;
    },
    callUpdate(state, action) {
      state.callUpdate = action.payload.data;
    },
    updateIsEditingTask(state, action) {
      state.editingTask = action.payload.data;
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice.reducer;
