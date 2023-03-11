/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {AppProvider} from './src/context/AppContext';
import {RootStack} from './src/navigation/RootStack';

const App = () => {
  return (
    <AppProvider>
      <RootStack />
    </AppProvider>
  );
};

export default App;
