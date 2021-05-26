import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {Profile, EditProfile} from '../../../screens/app';
import Follow from './Follow';
const Stack = createNativeStackNavigator();
const ProfileTab = () => (
  <Stack.Navigator
    screenOptions={{
      stackAnimation: 'slide_from_right',
      statusBarAnimation: 'slide',
    }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="Follow" component={Follow} />
  </Stack.Navigator>
);

export {ProfileTab};
