import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {googleSignIn} from '../../api/google/authApi';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {signIn} from '../../store/actions/authAction';

const SignIn = () => {
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
    <Button
      title="Google Sign-In"
      onPress={async () => handleGoogleSignIn().catch(err => console.log(err))}
    />
  );
};

export default SignIn;

const styles = StyleSheet.create({});
