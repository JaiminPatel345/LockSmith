import EncryptedStorage from 'react-native-encrypted-storage';
import {v4 as uuidv4} from 'uuid';
import generateRandomId from '../../utils/generateRandomId';

const storeData = async data => {
  try {
    data.id = generateRandomId();
    const dbData = await EncryptedStorage.getItem('LockSmith');
    let myData = JSON.parse(dbData);
    if (!myData) {
      myData = [];
    }
    myData.push(data);
    await EncryptedStorage.setItem('LockSmith', JSON.stringify(myData));
    console.log('Save new Record');
  } catch (e) {
    console.log('Error', e);
    //TODO:
    // saving error
  }
};

export default storeData;
