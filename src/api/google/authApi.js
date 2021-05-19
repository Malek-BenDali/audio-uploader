import config from '../../../config';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {useDispatch} from 'react-redux';
// import {signIn} from '../../store/actions/authAction';
// const dispatch = useDispatch();

const {webClientId} = config;
GoogleSignin.configure({
  webClientId,
});

const googleSignIn = async () => {
  try {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  } catch (err) {
    console.log(err);
  }
};

export {googleSignIn};
