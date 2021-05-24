import React, {useEffect} from 'react';
import {StyleSheet, Alert, Button} from 'react-native';
import {googleSignIn} from '../../api/google/authApi';
import {useDispatch, useSelector} from 'react-redux';
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
  // loading ? (
  //   <ActivityIndicator size="large" color={colors.primary} />
  // ) :
};

export default SignIn;

const styles = StyleSheet.create({});
