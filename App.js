import React, {useState, useEffect} from 'react';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Navigation from './src/navigation';
import {StatusBar} from 'react-native';
import {colors} from './src/assets';

const App = () => (
  <Provider store={store}>
    <StatusBar backgroundColor={colors.primary} />
    <Navigation />
  </Provider>
);
//   <PersistGate loading={null} persistor={persistor}>
{
  /* </PersistGate>*/
}
export default App;
