import React, {useEffect} from 'react';
import '../global.css';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewRecord from './screens/NewRecord';
import Records from './screens/Records';
import Home from './screens/Home';
import {useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {initRecords} from './store/thunk';
import {AlertNotificationRoot} from 'react-native-alert-notification';

const Stack = createNativeStackNavigator();

export default function App() {
  const Theme = useTheme();
  const dispatch = useDispatch();

  //Init store
  useEffect(() => {
    dispatch(initRecords());
  }, [dispatch]);
  return (
    <NavigationContainer theme={Theme}>
      <AlertNotificationRoot>
        <Stack.Navigator
          initialRouteName={'Home'}
          screenOptions={{
            headerStyle: {
              backgroundColor: Theme.colors.primaryContainer, // Background
              // color of the header
            },
            headerTintColor: Theme.colors.onBackground, // Color of back button and title text
            headerTitleStyle: {
              fontWeight: 'bold', // Customize font style of title
              fontSize: 20,
            },
            headerTitleAlign: 'center', // Align title to the center
          }}>
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
      </AlertNotificationRoot>
    </NavigationContainer>
  );
}
