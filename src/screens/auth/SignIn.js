import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {googleSignIn} from '../../api/google/authApi';

const SignIn = () => {
  const handleGoogleSignIn = () => googleSignIn();

  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        handleGoogleSignIn().then(() => console.log('Signed in with Google!'))
      }
    />
  );
};

export default SignIn;

const styles = StyleSheet.create({});
