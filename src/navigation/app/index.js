import React, {useEffect} from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {Home, Profile, EditProfile} from '../../screens/app';
import firestore from '@react-native-firebase/firestore';
import {
  updateFollowers,
  updateFollowing,
} from '../../store/actions/socialAction';
import {useSelector, useDispatch} from 'react-redux';

const Stack = createNativeStackNavigator();

const authNavigation = () => {
  const {uid, followers, following} = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        const newUserData = documentSnapshot.data();
        if (newUserData?.followers.length != followers.length)
          dispatch(
            updateFollowers({
              followers: newUserData.followers,
            }),
          );
      });
    return () => subscriber();
  }, [uid]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        const newUserData = documentSnapshot.data();
        if (newUserData?.following.length != following.length)
          dispatch(
            updateFollowing({
              following: newUserData.following,
            }),
          );
      });
    return () => subscriber();
  }, [uid]);
  return (
    <Stack.Navigator
      screenOptions={{
        stackAnimation: 'slide_from_right',
        statusBarAnimation: 'slide',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default authNavigation;
