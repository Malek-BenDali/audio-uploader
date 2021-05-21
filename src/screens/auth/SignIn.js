import React, {useEffect} from 'react';
import {StyleSheet, ActivityIndicator, Button} from 'react-native';
import {googleSignIn} from '../../api/google/authApi';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {signIn} from '../../store/actions/authAction';
// import database from '@react-native-firebase/database';

const SignIn = () => {
  // const loading = useSelector(state => state.user.loading);
  // console.log('loading', loading);
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    dispatch(signIn(user));
  }
  // const handleClick = () => {
  //   const newReference = database().ref('/users').push();

  //   console.log('Auto generated key: ', newReference.key);

  //   newReference
  //     .set({
  //       age: 32,
  //     })
  //     .then(() => console.log('Data updated.'));
  // };

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
