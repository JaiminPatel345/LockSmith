import storeData from '../screens/NewRecord/storeData';
import {
  addRecordInStore,
  deleteRecordInStore,
  setRecords,
} from './slices/recordSlice';
import deleteDbRecord from '../utils/deleteDbRecord';
import getData from '../utils/getData';
import generateRandomId from '../utils/generateRandomId';
import {useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

// Initialize Records
export const initRecords = () => async dispatch => {
  try {
    let data = await getData();
    if (!data) {
      data = [];
      await EncryptedStorage.setItem('LockSmith', JSON.stringify(data));
    }

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
    await deleteDbRecord(recordId);
    dispatch(deleteRecordInStore(recordId));
  } catch (error) {
    console.error('Error deleting record: ', error);
    //TODO: error notification
  }
};

export const updateRecord = updatedRecord => async dispatch => {
  try {
    console.log(updatedRecord);
    let dbData = await getData();
    dbData = dbData.map(record =>
      record.id === updatedRecord.id ? updatedRecord : record,
    );
    await EncryptedStorage.setItem('LockSmith', JSON.stringify(dbData));
    dispatch(setRecords(dbData));
  } catch (error) {
    console.error('Error updating record:', error);
  }
};
