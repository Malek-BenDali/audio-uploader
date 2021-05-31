import React from 'react';
import {
  Home,
  Search,
  CreateConversation,
  Conversation,
} from '../../../screens/app';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {ProfileTab} from '../Profile';

const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        stackAnimation: 'slide_from_right',
        statusBarAnimation: 'slide',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        name="Profile"
        component={ProfileTab}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CreateConversation" component={CreateConversation} />
      <Stack.Screen name="Conversation" component={Conversation} />
    </Stack.Navigator>
  );
};

export {HomeTab};
