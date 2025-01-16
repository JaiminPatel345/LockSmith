import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton, MD3Colors} from 'react-native-paper';

export default function Records({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Your Records</Text>

      {/*Bottom Icon*/}
      <View className={`absolute bottom-3 right-3 `}>
        <IconButton
          icon={() => (
            <MaterialCommunityIcons name="plus" size={40} color={'#fff'} />
          )}
          containerColor={MD3Colors.primary40}
          mode="contained"
          size={40}
          style={{width: 60, height: 60, borderRadius: 15}}
          onPress={() => navigation.navigate('NewRecord')}
          accessibilityLabel={`Add new Record`}
        />
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
