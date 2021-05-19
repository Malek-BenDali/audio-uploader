import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {Home} from '../../screens/app';

const Stack = createNativeStackNavigator();

const authNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      stackAnimation: 'slide_from_right',
      statusBarAnimation: 'slide',
    }}>
    <Stack.Screen name="Home" component={Home} />
    {/* <Stack.Screen name="SalonDetails" component={SalonDetails} /> */}
  </Stack.Navigator>
);

export default authNavigation;