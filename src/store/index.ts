import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import uiSlice from './ui-slice';

const reducers = {
  ui: uiSlice,
  auth: authSlice,
};
const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
