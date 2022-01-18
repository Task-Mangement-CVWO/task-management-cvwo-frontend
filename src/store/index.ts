import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';

const reducers = {
  ui: uiSlice,
};
const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
