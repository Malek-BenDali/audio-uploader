import React from 'react';
import {Home, Search, Profile} from '../../../screens/app';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        stackAnimation: 'slide_from_right',
        statusBarAnimation: 'slide',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export {HomeTab};
