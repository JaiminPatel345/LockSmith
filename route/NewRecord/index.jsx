import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton, MD3Colors, TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NewRecord({navigation}) {
  const [key, setKey] = React.useState('');
  const [value, setValue] = React.useState('');

  return (
    <View className={`h-full w-screen relative`}>
      {/*Bottom Icon*/}
      <View className={`absolute bottom-3 right-3 `}>
        <IconButton
          icon={() => (
            <MaterialCommunityIcons name="key-chain" size={30} color={'#fff'} />
          )}
          containerColor={MD3Colors.primary40}
          mode="contained"
          size={40}
          style={{width: 60, height: 60, borderRadius: 15}}
          onPress={() => navigation.navigate('Records')}
          accessibilityLabel={`Add new Record`}
        />
      </View>

      {/*Form*/}
      <View>
        <TextInput
          label="Key"
          value={key}
          onChangeText={text => setKey(text)}
        />
        <TextInput
          label="Value"
          value={value}
          onChangeText={text => setValue(text)}
        />
      </View>
    </View>
  );
}
