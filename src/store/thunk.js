import storeData from '../screens/NewRecord/storeData';
import {
  addRecordInStore,
  deleteRecordInStore,
  setRecords,
} from './slices/recordSlice';
import deleteDbRecord from '../utils/deleteDbRecord';
import getData from '../utils/getData';
import generateRandomId from '../utils/generateRandomId';

// Initialize Records
export const initRecords = () => async dispatch => {
  try {
    const data = await getData();
    dispatch(setRecords(data));
  } catch (error) {
    console.error('Error initializing records:', error);
    //TODO: error notification
  }
};

// Add Record
export const addRecord = record => async dispatch => {
  try {
    record.id = generateRandomId();
    await storeData(record);
    dispatch(addRecordInStore(record));
  } catch (error) {
    console.error('Error adding record:', error);
    //TODO: error notification
  }
};

// Delete Record
export const deleteRecord = recordId => async dispatch => {
  try {
    await deleteDbRecord(recordId); // Assuming it accepts the `id` of the record
    dispatch(deleteRecordInStore(recordId));
  } catch (error) {
    console.error('Error deleting record:', error);
    //TODO: error notification
  }
};
