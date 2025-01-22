import EncryptedStorage from 'react-native-encrypted-storage';

const getData = async () => {
  try {
    const dbData = await EncryptedStorage.getItem('LockSmith');
    console.log(JSON.parse(dbData));
    return JSON.parse(dbData);
  } catch (e) {
    console.log('Error', e);
  }
};

export default getData;
