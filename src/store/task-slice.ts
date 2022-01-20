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
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTasks(state, action) {
      state.data = action.payload.data;
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice.reducer;
