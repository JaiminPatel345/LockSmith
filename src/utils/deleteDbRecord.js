import EncryptedStorage from 'react-native-encrypted-storage';

const deleteDbRecord = async record => {
  try {
    const dbData = await EncryptedStorage.getItem('LockSmith');
    let myData = JSON.parse(dbData);
    myData = myData.filter(item => item.id !== record.id);
    await EncryptedStorage.setItem('LockSmith', JSON.stringify(myData));
  } catch (error) {
    console.log(error);
  }
};

export default deleteDbRecord;
