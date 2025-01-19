import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton, MD3Colors} from 'react-native-paper';
import records from '../../utils/demoData';
import ActionButton from '../../components/ActionButton';
import demoData from '../../utils/demoData';
import SingleRecord from '../../components/SingleRecord';

export default function Records({navigation}) {
  return (
    <View className={`relative flex-1`}>
      <FlatList
        data={demoData}
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

