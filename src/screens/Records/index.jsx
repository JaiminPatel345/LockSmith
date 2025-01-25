import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {ActivityIndicator, MD3Colors} from 'react-native-paper';
import SingleRecord from './SingleRecord';
import ReactNativeBiometrics from 'react-native-biometrics';
import FloatingButton from '../../components/FloatingButton';
import {useDispatch, useSelector} from 'react-redux';
import {initRecords} from '../../store/thunk';

export default function Records({navigation}) {
  const rnBiometrics = new ReactNativeBiometrics();
  const [isIdentityConfirmed, setIsIdentityConfirmed] = useState(false);
  const [showAllButtons, setShowAllButtons] = useState(false);

  const {records} = useSelector(state => state.records);

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

  //if not give biometrics then return
  if (process.env.NODE_ENV !== 'development' && !isIdentityConfirmed) {
    return null;
  }

  if (!records || records.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={MD3Colors.primary40} />
      </View>
    );
  }

  return (
    <View className={`relative flex-1`}>
      <FlatList
        data={records}
        renderItem={({item}) => <SingleRecord record={item} />}
        keyExtractor={item => item.id}
      />

      {/*Bottom Icon*/}
      <FloatingButton containerColor={MD3Colors.primary40} />
    </View>
  );
}
