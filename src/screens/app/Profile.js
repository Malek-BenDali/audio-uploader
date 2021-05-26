import React, {useEffect, useState} from 'react';
import {HeaderButton} from '../../shared';
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
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../assets';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const Profile = ({navigation, route}) => {
  const [openImage, setOpenImage] = useState(false);
  const [user, setUser] = useState({});
  const {photoURL, name, email, following, followers} = useSelector(
    state => state.user,
  );
  const userProfile = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        !userProfile && (
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
    if (userProfile !== undefined) {
      console.log('fucked one last time');
      firestore()
        .collection('Users')
        .doc(userProfile.uid)
        .get()
        .then(doc => setUser(doc._data));
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: user.name,
    });
  }, [user.name]);

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
              uri: !userProfile ? photoURL : user?.photoURL,
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
                  uri: !userProfile ? photoURL : user?.photoURL,
                }}
                style={styles.image}
              />
            </Pressable>
            <View style={styles.headerTopInfo}>
              <Text style={[styles.userName, styles.text]}>
                {!userProfile ? name : user?.name}
              </Text>
              <Text style={[styles.userEmail, styles.text]}>
                {!userProfile ? email : user?.email}
              </Text>
            </View>
          </View>
          <View style={styles.headerBottom}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.push('Follow', {screen: 'Followers'})}>
              <Text style={styles.text}>
                {!userProfile ? followers?.length : user?.followers?.length}
              </Text>
              <Text style={styles.text}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.push('Follow', {screen: 'Following'})}>
              <Text style={styles.text}>
                {!userProfile ? following?.length : user?.following?.length}{' '}
              </Text>
              <Text style={styles.text}>Following</Text>
            </TouchableOpacity>
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
