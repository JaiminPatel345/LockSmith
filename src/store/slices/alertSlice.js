import {createSlice} from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    title: null,
    message: '',
    type: '',
    isDialog: false,
  },
  reducers: {
    setAlert: (state, action) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isDialog = action.payload.isDialog || false;
    },
    clearAlert: state => {
      state.message = '';
      state.type = null;
      state.title = '';
      state.isDialog = false;
    },
  },
});

export const {setAlert, clearAlert} = alertSlice.actions;
export default alertSlice.reducer;
