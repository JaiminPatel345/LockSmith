import {createSlice} from '@reduxjs/toolkit';
import storeData from '../../screens/NewRecord/storeData';
import deleteDbRecord from '../../utils/deleteDbRecord';

const recordSlice = createSlice({
  name: 'records',
  initialState: {
    records: [],
    isIdentityConfirmed: false,
  },
  reducers: {
    setRecords: (state, action) => {
      state.records = action.payload;
    },
    addRecordInStore: (state, action) => {
      state.records.push(action.payload);
    },
    deleteRecordInStore: (state, action) => {
      state.records = state.records.filter(
        record => record.id !== action.payload,
      );
    },
    setAuthorizedUser: state => {
      state.isIdentityConfirmed = true;
    },
  },
});

export const {
  setRecords,
  addRecordInStore,
  deleteRecordInStore,
  setAuthorizedUser,
} = recordSlice.actions;
export default recordSlice.reducer;
