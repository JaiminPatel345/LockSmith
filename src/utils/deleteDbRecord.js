import EncryptedStorage from 'react-native-encrypted-storage';

const deleteDbRecord = async recordId => {
  try {
    const dbData = await EncryptedStorage.getItem('LockSmith');
    let myData = JSON.parse(dbData);
    myData = myData.filter(item => item.id !== recordId);
    await EncryptedStorage.setItem('LockSmith', JSON.stringify(myData));
  } catch (error) {
    console.log(error);
  }
};

export default deleteDbRecord;
