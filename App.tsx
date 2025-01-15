import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import './global.css';

export default function App() {
  return (
    <View style={styles.container}>
      <Text className={`text-blue-500`}>Native wind added</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myText: {
    color: '#ffffff',
  },
});
