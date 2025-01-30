import {configureStore} from '@reduxjs/toolkit';
import recordReducer from './slices/recordSlice';
import alertReducer from './slices/alertSlice';

export const store = configureStore({
  reducer: {
    records: recordReducer,
    alert: alertReducer,
  },
});
