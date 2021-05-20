import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import Auth from './auth';
import App from './app';
import {useSelector} from 'react-redux';

export default () => {
  const user = useSelector(state => state.user);
  return (
    <NavigationContainer>
      {user.isSignedIn ? <App /> : <Auth />}
    </NavigationContainer>
  );
};
