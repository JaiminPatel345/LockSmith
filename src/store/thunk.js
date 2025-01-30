import storeData from '../screens/NewRecord/storeData';
import {
  addRecordInStore,
  deleteRecordInStore,
  setRecords,
} from './slices/recordSlice';
import deleteDbRecord from '../utils/deleteDbRecord';
import getData from '../utils/getData';
import generateRandomId from '../utils/generateRandomId';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setAlert} from './slices/alertSlice';

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
    if (!record || !record.title) {
      //  enum ALERT_TYPE {
      // SUCCESS = 'SUCCESS',
      // DANGER = 'DANGER',
      // WARNING = 'WARNING',
      // INFO = 'INFO',
      // }
      dispatch(
        setAlert({
          title: 'Sorry !!',
          message: 'Title ( username / id' + " ) can't be empty ",
          type: 'WARNING',
        }),
      );
      return -1;
    }

    if (!record.key) {
      dispatch(
        setAlert({
          title: 'Sorry !!',
          message: "Password can't be empty ",
          type: 'WARNING',
        }),
      );
      return -1;
    }
    record.id = generateRandomId();
    await storeData(record);
    dispatch(addRecordInStore(record));
    dispatch(
      setAlert({
        title: 'Success',
        message: 'Record added successfully',
        type: 'SUCCESS',
        isDialog: true,
      }),
    );
  } catch (error) {
    console.error('Error adding record:', error);
    dispatch(
      setAlert({
        title: 'Error',
        message: error.message || 'Error in adding record',
        type: 'DANGER',
      }),
    );
  }
};

// Delete Record
export const deleteRecord = recordId => async dispatch => {
  try {
    await deleteDbRecord(recordId);
    dispatch(deleteRecordInStore(recordId));
    dispatch(
      setAlert({
        title: 'Success',
        message: 'Record deleted successfully',
        type: 'SUCCESS',
        isDialog: true,
      }),
    );
  } catch (error) {
    console.error('Error deleting record: ', error);
    dispatch(
      setAlert({
        title: 'Error',
        message: error.message || 'Error in deleting record',
        type: 'DANGER',
      }),
    );
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
    dispatch(
      setAlert({
        title: 'Success',
        message: 'Record updated successfully',
        type: 'SUCCESS',
        isDialog: true,
      }),
    );
  } catch (error) {
    console.error('Error updating record:', error);
    dispatch(
      setAlert({
        title: 'Error',
        message: error.message || 'Error in update record',
        type: 'DANGER',
      }),
    );
  }
};
