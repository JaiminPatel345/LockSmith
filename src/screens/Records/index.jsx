import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {ActivityIndicator, MD3Colors} from 'react-native-paper';
import SingleRecord from './SingleRecord';
import ReactNativeBiometrics from 'react-native-biometrics';
import FloatingButton from '../../components/FloatingButton';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthorizedUser} from '../../store/slices/recordSlice';

export default function Records({navigation}) {
  const rnBiometrics = new ReactNativeBiometrics();
  const isIdentityConfirmed = useSelector(
    state => state.records.isIdentityConfirmed,
  );
  const {records} = useSelector(state => state.records);
  const dispatch = useDispatch();

  //Ask for biometrics

  const checkBiometrics = () => {
    rnBiometrics
      .simplePrompt({
        promptMessage: 'Confirm identity for view passwords ',
      })
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          console.log('successful biometrics provided');
          dispatch(setAuthorizedUser());
        } else {
          console.log('user cancelled biometric prompt');
          navigation.navigate('Home');
        }
      })
      .catch(error => {
        console.log('biometrics failed');
        console.log(error);
      });
  };

  useEffect(() => {
    if (!isIdentityConfirmed) {
      checkBiometrics();
    }
  }, []);

  //if not give biometrics then return
  if (process.env.NODE_ENV !== 'development' && !isIdentityConfirmed) {
    return null;
  }

  if (!records || records.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className={'text-rose-500'}>No Records found</Text>
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
