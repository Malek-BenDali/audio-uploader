import {START_REQUEST, UPDATE_FOLLOWER, UPDATE_FOLLOWGIN} from './TYPES';
import {newFollower} from '../../shared/Notifications';
import firestore from '@react-native-firebase/firestore';

export const updateFollowers = payload => {
  return async dispatch => {
    try {
      const followerDetails = await firestore()
        .collection('Users')
        .doc(payload.followers[payload.followers.length - 1])
        .get();
      const {name, photoURL} = followerDetails._data;
      console.log(name, photoURL);
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
