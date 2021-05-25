import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Followers, Following} from '../../screens/app/Follow';

const Tab = createMaterialTopTabNavigator();

export default function Follow() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Followers" component={Followers} />
      <Tab.Screen name="Following" component={Following} />
    </Tab.Navigator>
  );
}
