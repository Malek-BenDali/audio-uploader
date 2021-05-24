import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './auth';
import App from './app';
import {useSelector} from 'react-redux';

export default () => {
  const {isSignedIn} = useSelector(state => state.user);

  return (
    <NavigationContainer>{isSignedIn ? <App /> : <Auth />}</NavigationContainer>
  );
};
