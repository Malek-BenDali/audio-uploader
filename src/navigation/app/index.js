import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  updateFollowers,
  updateFollowing,
} from '../../store/actions/socialAction';
import {useSelector, useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../assets';
import ProfileTab from './ProfileTab';
import HomeTab from './HomeTab';

const Tab = createBottomTabNavigator();

const authNavigation = () => {
  const {uid, followers, following, notifications} = useSelector(
    state => state.user,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        const newUserData = documentSnapshot.data();
        if (newUserData?.followers.length != followers.length) {
          dispatch(
            updateFollowers({
              followers: newUserData.followers,
              uid,
            }),
          );
          console.log('called');
        }
      });

    return () => subscriber();
  }, [followers]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        const newUserData = documentSnapshot.data();
        if (newUserData?.following.length != following.length)
          dispatch(
            updateFollowing({
              notifications,
              uid,
              following: newUserData.following,
            }),
          );
      });
    return () => subscriber();
  }, [following]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={focused ? 35 : 25}
              color={colors.primary}
            />
          ),
        }}
        component={HomeTab}
      />
      <Tab.Screen
        name="ProfileTab"
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'person-circle-sharp' : 'person-circle-outline'}
              size={focused ? 35 : 25}
              color={colors.primary}
            />
          ),
        }}
        component={ProfileTab}
      />
    </Tab.Navigator>
  );
};

export default authNavigation;
