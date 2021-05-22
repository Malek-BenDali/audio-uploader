import React, {useEffect} from 'react';
import {StyleSheet, Alert, Button} from 'react-native';
import {googleSignIn} from '../../api/google/authApi';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {signIn} from '../../store/actions/authAction';
import messaging from '@react-native-firebase/messaging';
// import database from '@react-native-firebase/database';

const SignIn = () => {
  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp : ', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
  }, []);
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    dispatch(signIn(user));
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      auth().onAuthStateChanged(onAuthStateChanged);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <Button
    //   title="Google Sign-In"
    //   onPress={async () => handleGoogleSignIn().catch(err => console.log(err))}
    // />
    <Button
      title="Google Sign-In"
      onPress={async () => await handleGoogleSignIn()}
    />
  );
  // loading ? (
  //   <ActivityIndicator size="large" color={colors.primary} />
  // ) :
};

export default SignIn;

const styles = StyleSheet.create({});
