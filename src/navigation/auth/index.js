import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {SignIn} from '../../screens/auth';

const Stack = createNativeStackNavigator();

const authNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      stackAnimation: 'slide_from_right',
      statusBarAnimation: 'slide',
    }}>
    <Stack.Screen name="signIn" component={SignIn} />
    {/* <Stack.Screen name="SalonDetails" component={SalonDetails} /> */}
  </Stack.Navigator>
);

export default authNavigation;
