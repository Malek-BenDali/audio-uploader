import React from 'react';
import {Home} from '../../screens/app';
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
    </Stack.Navigator>
  );
};

export default HomeTab;
