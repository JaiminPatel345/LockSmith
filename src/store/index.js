import {configureStore} from '@reduxjs/toolkit';
import recordReducer from './slices/recordSlice';

export const store = configureStore({
  reducer: {
    records: recordReducer,
  },
});
