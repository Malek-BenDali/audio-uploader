import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Followers, Following} from '../../../screens/app/Follow';

const Tab = createMaterialTopTabNavigator();

export default function Follow({route}) {
  const {followers, following} = route.params;
  return (
    <Tab.Navigator>
      <Tab.Screen name="Followers">
        {props => <Followers data={followers} {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Following">
        {props => <Following data={following} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
// adb -s R9AMC25H8PJ reverse tcp:8081 tcp:8082
