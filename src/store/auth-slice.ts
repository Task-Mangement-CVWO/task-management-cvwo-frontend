import { createSlice } from '@reduxjs/toolkit';
import { magic } from '../utilities/magicVariables';
import { setLocalStorageValue, removeLocalStorageValue } from '../utilities/localStorage';

type SliceState = {
  isLoggedIn: boolean;
  accessToken: string;
};

const initialState: SliceState = {
  isLoggedIn: false,
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.accessToken = action.payload.accessToken;
      setLocalStorageValue(magic.accessToken, action.payload.accessToken);
      state.isLoggedIn = true;
    },
    logout(state) {
      state.accessToken = '';
      removeLocalStorageValue(magic.accessToken);
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
