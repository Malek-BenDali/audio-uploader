import {SIGN_UP, LOGOUT} from './TYPES';
import auth from '@react-native-firebase/auth';

export const signIn = payload => ({
  type: SIGN_UP,
  payload,
});

export const logout = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'))
    .catch(err => console.log(err));
  return {
    type: LOGOUT,
    payload: {},
  };
};
