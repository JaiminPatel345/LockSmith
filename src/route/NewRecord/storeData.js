import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async data => {
  try {
    //TODO: encrypt data
    await AsyncStorage.setItem(data.key, JSON.stringify(data));
  } catch (e) {
    console.log('Error', e);
    //TODO:
    // saving error
  }
};

export default storeData;
