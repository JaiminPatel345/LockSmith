import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Button, MD3Colors, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home({navigation}) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'col', gap: 24}}>
        <Button
          icon={() => (
            <MaterialCommunityIcons name="key-plus" size={30} color={'#fff'} />
          )}
          mode="contained-tonal"
          onPress={() => navigation.navigate('NewRecord')}
          buttonColor={MD3Colors.primary40}
          textColor={theme.colors.onBackground}>
          New Record
        </Button>
        <Button
          icon={() => (
            <MaterialCommunityIcons name="key-chain" size={30} color={'#fff'} />
          )}
          mode="contained-tonal"
          onPress={() => navigation.navigate('Records')}
          buttonColor={MD3Colors.primary40}
          textColor={theme.colors.onBackground}>
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
