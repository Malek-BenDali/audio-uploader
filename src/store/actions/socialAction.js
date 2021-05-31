import {
  REMOVE_CONVERSATION,
  UPDATE_FOLLOWER,
  UPDATE_FOLLOWGIN,
  DELETE_FOLLOWING,
  ADD_CONVERSATION,
} from './TYPES';
import {newFollower} from '../../shared/Notifications';
import firestore from '@react-native-firebase/firestore';
// import Notification from '../../models/Notification';

export const updateFollowers = payload => {
  return async dispatch => {
    const {user, uid, email, name, photoURL} = payload;
    try {
      await firestore()
        .collection('Users')
        .doc(uid)
        .update({
          following: firestore.FieldValue.arrayUnion({
            ...user,
          }),
        });
      dispatch({
        type: UPDATE_FOLLOWER,
        payload: {
          uid,
          photoURL,
          name,
          email,
        },
      });
      newFollower('New Follower', `${name} started following you`, photoURL);
    } catch (err) {
      console.log('updateFollowers ', err);
    }
  };
};

export const updateFollowing = payload => {
  return async dispatch => {
    const {user, uid, photoURL, name, email} = payload;
    try {
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .update({
          following: firestore.FieldValue.arrayUnion({
            uid,
            name,
            email,
            photoURL,
          }),
        })
        .catch(err => 'HERE COMES THE ERROR' + err);
      await firestore()
        .collection('Users')
        .doc(uid)
        .update({
          followers: firestore.FieldValue.arrayUnion({
            uid: user?.uid,
            name: user?.name,
            email: user?.email,
            photoURL: user?.photoURL,
          }),
        });
      dispatch({
        type: UPDATE_FOLLOWGIN,
        payload,
      });
    } catch (err) {
      console.log('Error at socialAction updateFollowing', err);
    }
  };
};

export const Unfollow = payload => {
  const {user, uid, photoURL, name, email} = payload;
  return async dispatch => {
    try {
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .update({
          following: firestore.FieldValue.arrayRemove({
            uid,
            name,
            email,
            photoURL,
          }),
        });
      await firestore()
        .collection('Users')
        .doc(uid)
        .update({
          followers: firestore.FieldValue.arrayRemove({
            uid: user.uid,
            name: user.name,
            email: user.email,
            photoURL: user.photoURL,
          }),
        });
    } catch (err) {
      console.log('error at socialAction/Unfollow', err);
    }
    dispatch({
      type: DELETE_FOLLOWING,
      payload,
    });
  };
};

export const deleteFollower = payload => {
  const {userUid, uid, photoURL, name, email} = payload;
  return async dispatch => {
    try {
      await firestore()
        .collection('Users')
        .doc(userUid)
        .update({
          following: firestore.FieldValue.arrayRemove({
            uid,
            name,
            email,
            photoURL,
          }),
        });
    } catch (err) {
      console.log('error at socialAction/deleteFollower', err);
    }
    dispatch({
      type: DELETE_FOLLOWING,
      payload,
    });
  };
};

export const addConversation = payload => {
  return dispatch => {
    dispatch({
      type: ADD_CONVERSATION,
      payload,
    });
  };
};
export const removeConversation = payload => {
  return dispatch => {
    dispatch({
      type: REMOVE_CONVERSATION,
      payload,
    });
  };
};
