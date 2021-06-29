import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../../assets';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {addConversation} from '../../../store/actions/socialAction';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';

const reviewSchema = yup.object({
  title: yup.string().min(3).max(30).required(),
  about: yup.string().min(3).max(30).required(),
  description: yup.string().min(15).max(50).required(),
  tags: yup.string().min(3).max(30).required(),
});

const CreateConversation = ({navigation}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const userUid = useSelector(state => state.user.uid);
  useEffect(() => {
    navigation.setOptions({
      title: 'Create Conversation',
    });
  }, []);

  const handleFormSubmit = async (values, actions) => {
    setUploading(true);
    actions.resetForm();
    const data = {...values, image, uid: uuid.v4()};
    const tags = values.tags.split(' ');

    let filename = image.substring(image.lastIndexOf('/') + 1);
    try {
      await storage().ref(filename).putFile(image);
      const uri = await storage().ref(filename).getDownloadURL();
      const messages = await firestore().collection('Messages').add({});
      await firestore().collection('Conversation').doc(data.uid).set({
        uid: data.uid,
        participants: [],
        image: uri,
        title: data.title,
        createdAd: firestore.FieldValue.serverTimestamp(),
        about: data.about,
        description: data.description,
        tags: tags,
        moderator: userUid,
        messages: messages.id,
      });
      dispatch(addConversation({conversationId: data.uid}));
    } catch (err) {
      console.log('error in uploading the image ', err);
    }
    navigation.dispatch(
      StackActions.replace('Conversation', {conversationId: data.uid}),
    );
  };

  const takePhotoFromFiles = async () => {
    try {
      const imageFromPhone = await ImagePicker.openPicker({
        width: 450,
        height: 250,
        cropping: true,
      });
      setImage(
        Platform.OS === 'android'
          ? imageFromPhone.path
          : imageFromPhone.sourceURL,
      );
    } catch (err) {
      console.log('take photo error in create conver ', err);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{width: '100%'}}>
        {/* Form Section */}
        <View style={styles.FormView}>
          <Formik
            initialValues={{
              title: '',
              about: '',
              description: '',
              tags: '',
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
              <View>
                <TouchableOpacity
                  style={styles.imageUpload}
                  onPress={() => {
                    takePhotoFromFiles();
                  }}>
                  {image ? (
                    <Image
                      source={{uri: image}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Text>add image</Text>
                  )}
                </TouchableOpacity>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder="title"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.title && errors.title}
                  </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="about"
                    style={styles.input}
                    value={values.about}
                    onChangeText={handleChange('about')}
                    onBlur={handleBlur('about')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.about && errors.about}
                  </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="tags(fun food ...)"
                    style={styles.input}
                    value={values.tags}
                    onChangeText={handleChange('tags')}
                    onBlur={handleBlur('tags')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.tags && errors.tags}
                  </Text>
                </View>
                <View style={styles.inputView}>
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
                {uploading ? (
                  <ActivityIndicator size="large" color={colors.secondary} />
                ) : (
                  <TouchableOpacity
                    title="submit"
                    style={styles.submitButton}
                    onPress={handleSubmit}>
                    <Text style={styles.primaryButtonText}>Create</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateConversation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    // borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    backgroundColor: colors.tertiary,
  },
  description: {
    height: 70,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  inputView: {
    marginTop: 10,
  },
  imageUpload: {
    marginBottom: 10,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  submitButton: {
    width: '80%',
    // borderWidth: 1,
    marginTop: 10,
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.secondary,
  },
  primaryButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: colors.white,
  },
});
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../../assets';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {addConversation} from '../../../store/actions/socialAction';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';

const reviewSchema = yup.object({
  title: yup.string().min(3).max(30).required(),
  about: yup.string().min(3).max(30).required(),
  description: yup.string().min(15).max(50).required(),
  tags: yup.string().min(3).max(30).required(),
});

const CreateConversation = ({navigation}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const userUid = useSelector(state => state.user.uid);
  useEffect(() => {
    navigation.setOptions({
      title: 'Create Conversation',
    });
  }, []);

  const handleFormSubmit = async (values, actions) => {
    setUploading(true);
    actions.resetForm();
    const data = {...values, image, uid: uuid.v4()};
    const tags = values.tags.split(' ');

    let filename = image.substring(image.lastIndexOf('/') + 1);
    try {
      await storage().ref(filename).putFile(image);
      const uri = await storage().ref(filename).getDownloadURL();
      const messages = await firestore().collection('Messages').add({});
      await firestore().collection('Conversation').doc(data.uid).set({
        uid: data.uid,
        participants: [],
        image: uri,
        title: data.title,
        createdAd: firestore.FieldValue.serverTimestamp(),
        about: data.about,
        description: data.description,
        tags: tags,
        moderator: userUid,
        messages: messages.id,
      });
      dispatch(addConversation({conversationId: data.uid}));
    } catch (err) {
      console.log('error in uploading the image ', err);
    }
    navigation.dispatch(
      StackActions.replace('Conversation', {conversationId: data.uid}),
    );
  };

  const takePhotoFromFiles = async () => {
    try {
      const imageFromPhone = await ImagePicker.openPicker({
        width: 450,
        height: 250,
        cropping: true,
      });
      setImage(
        Platform.OS === 'android'
          ? imageFromPhone.path
          : imageFromPhone.sourceURL,
      );
    } catch (err) {
      console.log('take photo error in create conver ', err);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{width: '100%'}}>
        {/* Form Section */}
        <View style={styles.FormView}>
          <Formik
            initialValues={{
              title: '',
              about: '',
              description: '',
              tags: '',
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
              <View>
                <TouchableOpacity
                  style={styles.imageUpload}
                  onPress={() => {
                    takePhotoFromFiles();
                  }}>
                  {image ? (
                    <Image
                      source={{uri: image}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Text>add image</Text>
                  )}
                </TouchableOpacity>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder="title"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.title && errors.title}
                  </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="about"
                    style={styles.input}
                    value={values.about}
                    onChangeText={handleChange('about')}
                    onBlur={handleBlur('about')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.about && errors.about}
                  </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="tags(fun food ...)"
                    style={styles.input}
                    value={values.tags}
                    onChangeText={handleChange('tags')}
                    onBlur={handleBlur('tags')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.tags && errors.tags}
                  </Text>
                </View>
                <View style={styles.inputView}>
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
                {uploading ? (
                  <ActivityIndicator size="large" color={colors.secondary} />
                ) : (
                  <TouchableOpacity
                    title="submit"
                    style={styles.submitButton}
                    onPress={handleSubmit}>
                    <Text style={styles.primaryButtonText}>Create</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateConversation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    // borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    backgroundColor: colors.tertiary,
  },
  description: {
    height: 70,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  inputView: {
    marginTop: 10,
  },
  imageUpload: {
    marginBottom: 10,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  submitButton: {
    width: '80%',
    // borderWidth: 1,
    marginTop: 10,
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.secondary,
  },
  primaryButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: colors.white,
  },
});
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../../assets';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {addConversation} from '../../../store/actions/socialAction';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';

const reviewSchema = yup.object({
  title: yup.string().min(3).max(30).required(),
  about: yup.string().min(3).max(30).required(),
  description: yup.string().min(15).max(50).required(),
  tags: yup.string().min(3).max(30).required(),
});

const CreateConversation = ({navigation}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const userUid = useSelector(state => state.user.uid);
  useEffect(() => {
    navigation.setOptions({
      title: 'Create Conversation',
    });
  }, []);

  const handleFormSubmit = async (values, actions) => {
    setUploading(true);
    actions.resetForm();
    const data = {...values, image, uid: uuid.v4()};
    const tags = values.tags.split(' ');

    let filename = image.substring(image.lastIndexOf('/') + 1);
    try {
      await storage().ref(filename).putFile(image);
      const uri = await storage().ref(filename).getDownloadURL();
      const messages = await firestore().collection('Messages').add({});
      await firestore().collection('Conversation').doc(data.uid).set({
        uid: data.uid,
        participants: [],
        image: uri,
        title: data.title,
        createdAd: firestore.FieldValue.serverTimestamp(),
        about: data.about,
        description: data.description,
        tags: tags,
        moderator: userUid,
        messages: messages.id,
      });
      dispatch(addConversation({conversationId: data.uid}));
    } catch (err) {
      console.log('error in uploading the image ', err);
    }
    navigation.dispatch(
      StackActions.replace('Conversation', {conversationId: data.uid}),
    );
  };

  const takePhotoFromFiles = async () => {
    try {
      const imageFromPhone = await ImagePicker.openPicker({
        width: 450,
        height: 250,
        cropping: true,
      });
      setImage(
        Platform.OS === 'android'
          ? imageFromPhone.path
          : imageFromPhone.sourceURL,
      );
    } catch (err) {
      console.log('take photo error in create conver ', err);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{width: '100%'}}>
        {/* Form Section */}
        <View style={styles.FormView}>
          <Formik
            initialValues={{
              title: '',
              about: '',
              description: '',
              tags: '',
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
              <View>
                <TouchableOpacity
                  style={styles.imageUpload}
                  onPress={() => {
                    takePhotoFromFiles();
                  }}>
                  {image ? (
                    <Image
                      source={{uri: image}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Text>add image</Text>
                  )}
                </TouchableOpacity>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder="title"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.title && errors.title}
                  </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="about"
                    style={styles.input}
                    value={values.about}
                    onChangeText={handleChange('about')}
                    onBlur={handleBlur('about')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.about && errors.about}
                  </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="tags(fun food ...)"
                    style={styles.input}
                    value={values.tags}
                    onChangeText={handleChange('tags')}
                    onBlur={handleBlur('tags')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.tags && errors.tags}
                  </Text>
                </View>
                <View style={styles.inputView}>
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
                {uploading ? (
                  <ActivityIndicator size="large" color={colors.secondary} />
                ) : (
                  <TouchableOpacity
                    title="submit"
                    style={styles.submitButton}
                    onPress={handleSubmit}>
                    <Text style={styles.primaryButtonText}>Create</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateConversation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    // borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    backgroundColor: colors.tertiary,
  },
  description: {
    height: 70,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  inputView: {
    marginTop: 10,
  },
  imageUpload: {
    marginBottom: 10,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  submitButton: {
    width: '80%',
    // borderWidth: 1,
    marginTop: 10,
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.secondary,
  },
  primaryButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: colors.white,
  },
});
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../../assets';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {addConversation} from '../../../store/actions/socialAction';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';

const reviewSchema = yup.object({
  title: yup.string().min(3).max(30).required(),
  about: yup.string().min(3).max(30).required(),
  description: yup.string().min(15).max(50).required(),
  tags: yup.string().min(3).max(30).required(),
});

const CreateConversation = ({navigation}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const userUid = useSelector(state => state.user.uid);
  useEffect(() => {
    navigation.setOptions({
      title: 'Create Conversation',
    });
  }, []);

  const handleFormSubmit = async (values, actions) => {
    setUploading(true);
    actions.resetForm();
    const data = {...values, image, uid: uuid.v4()};
    const tags = values.tags.split(' ');

    let filename = image.substring(image.lastIndexOf('/') + 1);
    try {
      await storage().ref(filename).putFile(image);
      const uri = await storage().ref(filename).getDownloadURL();
      const messages = await firestore().collection('Messages').add({});
      await firestore().collection('Conversation').doc(data.uid).set({
        uid: data.uid,
        participants: [],
        image: uri,
        title: data.title,
        createdAd: firestore.FieldValue.serverTimestamp(),
        about: data.about,
        description: data.description,
        tags: tags,
        moderator: userUid,
        messages: messages.id,
      });
      dispatch(addConversation({conversationId: data.uid}));
    } catch (err) {
      console.log('error in uploading the image ', err);
    }
    navigation.dispatch(
      StackActions.replace('Conversation', {conversationId: data.uid}),
    );
  };

  const takePhotoFromFiles = async () => {
    try {
      const imageFromPhone = await ImagePicker.openPicker({
        width: 450,
        height: 250,
        cropping: true,
      });
      setImage(
        Platform.OS === 'android'
          ? imageFromPhone.path
          : imageFromPhone.sourceURL,
      );
    } catch (err) {
      console.log('take photo error in create conver ', err);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{width: '100%'}}>
        {/* Form Section */}
        <View style={styles.FormView}>
          <Formik
            initialValues={{
              title: '',
              about: '',
              description: '',
              tags: '',
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
              <View>
                <TouchableOpacity
                  style={styles.imageUpload}
                  onPress={() => {
                    takePhotoFromFiles();
                  }}>
                  {image ? (
                    <Image
                      source={{uri: image}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Text>add image</Text>
                  )}
                </TouchableOpacity>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder="title"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.title && errors.title}
                  </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="about"
                    style={styles.input}
                    value={values.about}
                    onChangeText={handleChange('about')}
                    onBlur={handleBlur('about')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.about && errors.about}
                  </Text>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="tags(fun food ...)"
                    style={styles.input}
                    value={values.tags}
                    onChangeText={handleChange('tags')}
                    onBlur={handleBlur('tags')}
                  />
                  <Text style={styles.errorMessage}>
                    {touched.tags && errors.tags}
                  </Text>
                </View>
                <View style={styles.inputView}>
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
                {uploading ? (
                  <ActivityIndicator size="large" color={colors.secondary} />
                ) : (
                  <TouchableOpacity
                    title="submit"
                    style={styles.submitButton}
                    onPress={handleSubmit}>
                    <Text style={styles.primaryButtonText}>Create</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateConversation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    // borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    backgroundColor: colors.tertiary,
  },
  description: {
    height: 70,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  inputView: {
    marginTop: 10,
  },
  imageUpload: {
    marginBottom: 10,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  submitButton: {
    width: '80%',
    // borderWidth: 1,
    marginTop: 10,
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.secondary,
  },
  primaryButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: colors.white,
  },
});
