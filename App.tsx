import React from 'react';
import './global.css';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewRecord from './route/NewRecord';
import Records from './route/Records';
import Home from './route/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{
            title: 'Lock Smith ',
          }}
        />
        <Stack.Screen
          name={`NewRecord`}
          component={NewRecord}
          options={{title: 'Add Record'}}
        />
        <Stack.Screen
          name={'Records'}
          component={Records}
          options={{title: 'All records'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
