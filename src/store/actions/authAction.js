import {SIGN_UP, LOGOUT} from './TYPES';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Profile from '../../models/Profile';

export const logout = () => {
  return dispatch => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      //check here
      .catch(err => console.log(err));
    dispatch({
      type: LOGOUT,
    });
  };
};

export const signIn = payload => {
  return async dispatch => {
    try {
      const {displayName, email, photoURL, uid} = payload;
      const account = await firestore().collection('Users').doc(uid).get();
      if (!account._exists) {
        const profile = new Profile(
          uid,
          email,
          photoURL,
          displayName,
          Date.now(),
          Date.now(),
          [],
          [],
          '',
          [],
          [],
        );
        await firestore()
          .collection('Users')
          .doc(uid)
          .set({
            ...profile,
          });
        dispatch({
          type: SIGN_UP,
          payload: profile,
        });
      } else {
        await firestore().collection('Users').doc(uid).update({
          lastLogin: Date.now(),
        });
        const {
          email,
          name,
          photoURL,
          createdAt,
          followers,
          following,
          description,
          interestedIn,
          conversation,
        } = account._data;
        const profile = new Profile(
          uid,
          email,
          photoURL,
          name,
          createdAt,
          Date.now(),
          followers,
          following,
          description,
          interestedIn,
          conversation,
        );
        dispatch({
          type: SIGN_UP,
          payload: profile,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
