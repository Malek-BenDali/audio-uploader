import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import Auth from './auth';

export default () => (
  <NavigationContainer>
    <Auth />
  </NavigationContainer>
);
