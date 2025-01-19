/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
