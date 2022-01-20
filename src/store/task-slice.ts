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
  callUpdate: boolean;
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
  callUpdate: true,
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
    callUpdate(state) {
      state.callUpdate = !state.callUpdate;
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice.reducer;
