import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  notifcation: {
    status: string;
    title: string;
    message: string;
  };
};

const initialState: SliceState = {
  notifcation: { status: '', title: '', message: '' },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.notifcation = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    clearNotification(state) {
      state.notifcation = {
        status: '',
        title: '',
        message: '',
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
