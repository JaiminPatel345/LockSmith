import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Button, MD3Colors} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'col', gap: 24}}>
        <Button
          icon={() => (
            <MaterialCommunityIcons name="key-plus" size={30} color={'#fff'} />
          )}
          mode="contained-tonal"
          onPress={() => navigation.navigate('NewRecord')}
          buttonColor={MD3Colors.primary40}>
          New Record
        </Button>
        <Button
          icon={() => (
            <MaterialCommunityIcons name="key-chain" size={30} color={'#fff'} />
          )}
          mode="contained-tonal"
          onPress={() => navigation.navigate('Records')}
          buttonColor={MD3Colors.primary40}>
          Show Records
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
