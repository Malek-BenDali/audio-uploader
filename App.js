import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '##############.apps.googleusercontent.com',
});

const App = () => {
  const onGoogleButtonPress = async () => {
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
  };
  // const audioRecorderPlayer = new AudioRecorderPlayer();

  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress()
          .then(() => console.log('Signed in with Google!'))
          .catch(err => console.log(err))
      }
    />
  );
};

export default App;

const styles = StyleSheet.create({});
