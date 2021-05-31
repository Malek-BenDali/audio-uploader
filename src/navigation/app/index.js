import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  updateFollowers,
  updateFollowing,
  deleteFollower,
} from '../../store/actions/socialAction';
import {useSelector, useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../assets';
import {ProfileTab} from './Profile';
import {HomeTab} from './Home';

const Tab = createBottomTabNavigator();

const authNavigation = () => {
  const {uid, followers, following, name, photoURL, email} = useSelector(
    state => state.user,
  );
  const dispatch = useDispatch();
  useEffect(async () => {
    const subscriber = await firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        const newUserData = documentSnapshot.data();
        console;
        if (newUserData?.followers?.length > followers?.length) {
          dispatch(
            updateFollowers({
              uid: newUserData.followers[newUserData?.followers.length - 1].uid,
              user: {
                uid,
                name,
                email,
                photoURL,
              },
              name: newUserData.followers[newUserData?.followers.length - 1]
                .name,
              email:
                newUserData.followers[newUserData?.followers.length - 1].email,
              photoURL:
                newUserData.followers[newUserData?.followers.length - 1]
                  .photoURL,
            }),
          );
        } else if (newUserData?.followers?.length < followers?.length) {
          dispatch(
            deleteFollower({
              uid: newUserData.followers.uid,
              user: uid,
              name: newUserData.followers.name,
              email: newUserData.followers.email,
              photoURL: newUserData.followers.photoURL,
            }),
          );
        }
      });

    return () => subscriber();
  }, [followers]);

  useEffect(async () => {
    const subscriber = await firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        const newUserData = documentSnapshot.data();
        if (newUserData?.following.length > following.length)
          dispatch(
            updateFollowing({
              user: {
                uid,
                name,
                email,
                photoURL,
              },
              uid: newUserData?.following,
            }),
          );
      });
    return () => subscriber();
  }, [following]);
  return <HomeTab />;
};

export default authNavigation;
