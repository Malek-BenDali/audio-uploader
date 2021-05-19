import React, {useState, useEffect} from 'react';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Navigation from './src/navigation';

const App = () => <Navigation />;
// <Provider store={store}>
//   <PersistGate loading={null} persistor={persistor}>

{
  /* </PersistGate>
  </Provider>; */
}
export default App;
