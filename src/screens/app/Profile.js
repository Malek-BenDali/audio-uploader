import React, {useEffect, useState} from 'react';
import {HeaderButton} from '../../shared';
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
  Modal,
  StatusBar,
  Pressable,
} from 'react-native';
import {colors} from '../../assets';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {updateFollow} from '../../store/actions/socialAction';

const Profile = ({navigation, route}) => {
  const [openImage, setOpenImage] = useState(false);
  const uid = useSelector(state => state.user.uid);
  const userData = useSelector(state => state.user);
  const [user, setUser] = useState({
    photoURL: userData.photoURL,
    name: userData.name,
    email: userData.email,
    following: userData.following,
    followers: userData.followers,
  });
  const {photoURL, name, email, followers, following} = user;
  const dispatch = useDispatch();
  const userProfile = route.params !== undefined;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerRight: () =>
        userProfile && (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="settings"
              iconName="settings"
              onPress={() => {
                navigation.navigate('EditProfile');
              }}
            />
          </HeaderButtons>
        ),
    });
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        const {following, followers} = documentSnapshot.data();
        dispatch(updateFollow({followers, following}));
        setUser({...user, followers, following});
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userData.followers, userData.following]);
  return (
    <View style={styles.container}>
      <Modal
        visible={openImage}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setOpenImage(false);
        }}>
        <View style={styles.imageBackground}>
          <Pressable
            style={styles.closeImage}
            onPress={() => setOpenImage(false)}>
            <Ionicons name="close" size={30} color={colors.white} />
          </Pressable>
          <StatusBar backgroundColor="black" />
          <Image
            source={{
              uri: photoURL,
            }}
            style={{width, height: width}}
          />
        </View>
      </Modal>
      <ScrollView>
        {/* header Section */}
        <View style={styles.header}>
          {/* photo and name section  */}
          <View style={styles.headerTop}>
            <Pressable onPress={() => setOpenImage(true)}>
              <Image
                source={{
                  uri: photoURL,
                }}
                style={styles.image}
              />
            </Pressable>
            <View style={styles.headerTopInfo}>
              <Text style={[styles.userName, styles.text]}>{name}</Text>
              <Text style={[styles.userEmail, styles.text]}>{email}</Text>
            </View>
          </View>
          <View style={styles.headerBottom}>
            <View style={styles.box}>
              <Text style={styles.text}>{followers.length}</Text>
              <Text style={styles.text}>Followers</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>{following.length} </Text>
              <Text style={styles.text}>Followers</Text>
            </View>
          </View>
        </View>

        {/* Body Section  */}

        <View style={styles.body}></View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  imageBackground: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  closeImage: {position: 'absolute', top: 15, right: 15},
  header: {
    height: height * 0.25,
    // backgroundColor: 'red',
    margin: 7,
    padding: 5,
  },
  headerTop: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
    flex: 5,
  },
  headerBottom: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  box: {
    width: width * 0.28,
    height: '65%',
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderColor: colors.white,
  },
  image: {
    borderColor: colors.white,
    borderWidth: 1,
    height: height * 0.14,
    width: height * 0.14,
    borderRadius: (height * 0.14) / 2,
  },
  headerTopInfo: {
    marginLeft: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 23,
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    fontStyle: 'italic',
  },
  body: {
    backgroundColor: colors.white,
    height: 500,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    // marginHorizontal: 10,
  },
  text: {
    color: colors.white,
  },
});
