import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../assets';
import {HeaderButton} from '../../shared';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
import * as yup from 'yup';
import {Formik} from 'formik';

const EditProfile = ({navigation}) => {
  const {name, description, uid} = useSelector(state => state.user);
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
    description: yup.string().required().min(15).max(100),
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={styles.FormView}>
          <Formik
            initialValues={{
              name: name,
              description,
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
                <TextInput
                  style={[styles.input, styles.description]}
                  placeholder="description"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                />
                <Text style={styles.errorMessage}>
                  {touched.description && errors.description}
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditProfile;
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  input: {
    // borderWidth: 1,
    borderRadius: 10,
    width: width * 0.5,
    backgroundColor: colors.tertiary,
  },
  description: {
    height: 80,
  },
  container: {
    flex: 1,

    backgroundColor: colors.primary,
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
