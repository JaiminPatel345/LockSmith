import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try {
    console.log('Start to getting data');

    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);

    // Convert the array of key-value pairs into an object
    const parsedData = values.map(([_, value]) => JSON.parse(value));

    console.log(parsedData);
    return parsedData;
  } catch (e) {
    console.log('Error', e);
  }
};

export default getData;
