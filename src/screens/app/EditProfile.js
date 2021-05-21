import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../assets';
import {HeaderButton} from '../../shared';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
import * as yup from 'yup';
import {Formik} from 'formik';

const EditProfile = ({navigation}) => {
  const {name, uid} = useSelector(state => state.user);
  console.log(uid);
  useEffect(() => {
    navigation.setOptions({
      headerCenter: () => <Text>Edit Profile</Text>,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="checkmark"
            iconName="checkmark"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="close"
            iconName="close"
            color="black"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const reviewSchema = yup.object({
    name: yup.string().required().min(3).max(10),
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.FormView}>
          <Formik
            initialValues={{
              name: name,
            }}
            validationSchema={reviewSchema}
            onSubmit={(values, actions) => handleFormSubmit(values, actions)}>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleSubmit,
              handleChange,
            }) => (
              <View style={{flex: 1, height: 500}}>
                <TextInput
                  style={styles.input}
                  placeholder="name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                <Text style={styles.errorMessage}>
                  {touched.name && errors.name}
                </Text>
                <View style={styles.SubmitView}>
                  <TouchableOpacity
                    title="submit"
                    style={styles.primaryButton}
                    onPress={handleSubmit}>
                    <Text style={styles.primaryButtonText}>Sign in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  FormView: {
    alignItems: 'center',
    marginTop: 40,
    flex: 1,
  },
  SubmitView: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 30,

    bottom: 5,
  },
});
