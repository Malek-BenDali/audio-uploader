import React from 'react';
import {
  Home,
  Search,
  CreateConversation,
  Conversation,
  Profile,
  EditProfile,
} from '../../../screens/app';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import Follow from '../Profile/Follow';
import {colors} from '../../../assets';

const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        stackAnimation: 'slide_from_right',
        statusBarAnimation: 'slide',
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.black,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="CreateConversation" component={CreateConversation} />
      <Stack.Screen name="Conversation" component={Conversation} />
      <Stack.Screen
        name="Profile"
        // options={{headerShown: false}}
        component={Profile}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Follow" component={Follow} />
    </Stack.Navigator>
  );
};

export {HomeTab};
