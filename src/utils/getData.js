import EncryptedStorage from 'react-native-encrypted-storage';

const getData = async () => {
  try {
    const dbData = await EncryptedStorage.getItem('LockSmith');
    return JSON.parse(dbData);
  } catch (e) {
    console.log('Error', e);
  }
};

export default getData;
