import React, {useState} from 'react';
import {StyleSheet, Text, Button, View, ActivityIndicator} from 'react-native';
import {googleSignIn} from '../../api/google/authApi';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {signIn} from '../../store/actions/authAction';
import {colors} from '../../assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    <View style={styles.container}>
      <View style={styles.topScreen}>
        <Text style={styles.welcomeText}>welcome</Text>
        <MaterialIcons
          size={50}
          style={{alignSelf: 'center', paddingTop: 50}}
          name="celebration"
          color={colors.tertiary}
        />
      </View>
      <View style={styles.buttonScreen}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.blue} />
        ) : (
          <>
            <GoogleSigninButton
              style={{width: 192, height: 55}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={async () => {
                handleGoogleSignIn().catch(err => console.log(err));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setErrorMessage('Something went wrong');
                }, 10000);
              }}
              // disabled={this.state.isSigninInProgress}
            />
            <Text style={{alignSelf: 'center'}}> {errorMessage} </Text>
          </>
        )}
      </View>
    </View>
  );
  // loading ? (
  //   <ActivityIndicator size="large" color={colors.primary} />
  // ) :
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.primary,
  },
  topScreen: {
    justifyContent: 'center',
    flex: 2,
  },
  welcomeText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 35,
    color: colors.black,
  },
  buttonScreen: {
    flex: 1,
  },
});
