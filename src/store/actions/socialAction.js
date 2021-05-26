import {START_REQUEST, UPDATE_FOLLOWER, UPDATE_FOLLOWGIN} from './TYPES';
import {newFollower} from '../../shared/Notifications';
import firestore from '@react-native-firebase/firestore';
import Notification from '../../models/Notification';

export const updateFollowers = payload => {
  return async dispatch => {
    try {
      const followerDetails = await firestore()
        .collection('Users')
        .doc(payload.followers[payload.followers.length - 1])
        .get();
      const {name, photoURL} = followerDetails._data;
      // const newNotification = new Notification(
      //   name,
      //   'a commancer à vous suivre',
      //   photoURL,
      //   Date.now(),
      //   followerDetails._data.uid,
      //   payload.uid,
      //   false,
      // );
      // const a = await firestore()
      //   .collection(`Notifications`)
      //   .add({
      //     ...newNotification,
      //   });
      // dispatch({
      //   type : UPDATE_NOTIFICATIONS,
      //   payload : { uid : a.id}
      // })
      dispatch({
        type: UPDATE_FOLLOWER,
        payload,
      });
      newFollower(
        `${name} a commencer a vous suivre`,
        'he begins to follow u',
        photoURL,
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateFollowing = payload => {
  return dispatch => {
    dispatch({
      type: UPDATE_FOLLOWGIN,
      payload,
    });
  };
};
