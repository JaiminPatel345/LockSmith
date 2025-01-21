import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {MD3Colors} from 'react-native-paper';
import ActionButton from '../../components/ActionButton';
import SingleRecord from './SingleRecord';
import ReactNativeBiometrics from 'react-native-biometrics';
import getData from './getData';

export default function Records({navigation}) {
  const rnBiometrics = new ReactNativeBiometrics();
  const [isIdentityConfirmed, setIsIdentityConfirmed] = useState(false);
  const [allRecords, setAllRecords] = useState([]);

  useEffect(() => {
    getData().then(data => {
      setAllRecords(data);
    });
  }, []);

  //Ask for biometrics
  useEffect(() => {
    rnBiometrics
      .simplePrompt({
        promptMessage: 'Confirm identity for view passwords ',
      })
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          console.log('successful biometrics provided');
          setIsIdentityConfirmed(true);
        } else {
          console.log('user cancelled biometric prompt');
          navigation.navigate('Home');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  }, []);

  if (!isIdentityConfirmed) {
    return null;
  }

  return (
    <View className={`relative flex-1`}>
      <FlatList
        data={allRecords}
        renderItem={({item}) => <SingleRecord record={item} />}
      />

      {/*Bottom Icon*/}
      <ActionButton
        iconName={'plus'}
        containerColor={MD3Colors.primary40}
        mode="contained"
        className="flex-1"
        size={40}
        onPress={() => navigation.navigate('NewRecord')}
        accessibilityLabel={`Add new Record`}
        style={{width: 60, height: 60, borderRadius: 15}}
      />
    </View>
  );
}
