import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '452294585565-cma0bm3df6tbjeek76c4ead690pplhj3.apps.googleusercontent.com',
});

const App = () => {
  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.log(err);
    }
  }
  // const audioRecorderPlayer = new AudioRecorderPlayer();

  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
    />
  );
};

export default App;

const styles = StyleSheet.create({});
