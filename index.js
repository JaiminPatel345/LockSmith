/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/store';

// AppRegistry.registerComponent(appName, () => App);
export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
