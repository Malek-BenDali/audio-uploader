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
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {
  updateFollowing,
  deleteFollower,
} from '../../store/actions/socialAction';
import moment from 'moment';
import Octocons from 'react-native-vector-icons/Octicons';

const Profile = ({navigation, route}) => {
  const [openImage, setOpenImage] = useState(false);
  const [user, setUser] = useState({});
  const {
    uid,
    photoURL,
    name,
    email,
    following,
    followers,
    lastLogin,
    description,
    interestedIn,
  } = useSelector(state => state.user);
  const userProfile = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: user.name,
      headerRight: () =>
        !userProfile && (
          <>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="settings"
                iconName="settings"
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}
              />
            </HeaderButtons>
          </>
        ),
    });
    if (userProfile !== undefined) {
      firestore()
        .collection('Users')
        .doc(userProfile?.uid)
        .get()
        .then(doc => setUser(doc._data));
    }
  }, [user.name]);

  const FollowButton = () => {
    return checkFollow() ? (
      <TouchableOpacity
        style={[styles.followButton, {backgroundColor: colors.secondary}]}
        onPress={() =>
          dispatch(
            updateFollowing({
              user: {
                uid,
                photoURL,
                name,
                email,
              },
              uid: user.uid,
              photoURL: user.photoURL,
              name: user.name,
              email: user.email,
            }),
          )
        }>
        <Text style={{color: colors.white, fontSize: 20, fontWeight: 'bold'}}>
          Follow
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[styles.followButton, {backgroundColor: colors.tertiary}]}
        onPress={() =>
          dispatch(
            deleteFollower({
              user: {
                uid,
                photoURL,
                name,
                email,
              },
              uid: user.uid,
              photoURL: user.photoURL,
              name: user.name,
              email: user.email,
            }),
          )
        }>
        <Text style={{color: colors.white, fontSize: 20, fontWeight: 'bold'}}>
          Unfollow
        </Text>
      </TouchableOpacity>
    );
  };

  const compareDate = date1 => {
    console.log(moment().diff(date1, 'days'));
  };
  compareDate(lastLogin);

  const isBelowThreshold = currentValue => currentValue.uid !== user.uid;
  const checkFollow = () => {
    if (!userProfile) return false;
    if (following?.every(isBelowThreshold)) return true;
    return false;
  };
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
              onPress={() =>
                navigation.push('Follow', {
                  screen: 'Followers',
                  followers: !userProfile ? followers : user?.followers,
                  following: !userProfile ? following : user?.following,
                })
              }>
              <Text style={styles.text}>
                {!userProfile ? followers?.length : user?.followers?.length}
              </Text>
              <Text style={styles.text}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() =>
                navigation.push('Follow', {
                  screen: 'Following',
                  followers: !userProfile ? followers : user?.followers,
                  following: !userProfile ? following : user?.following,
                })
              }>
              <Text style={styles.text}>
                {!userProfile ? following?.length : user?.following?.length}
              </Text>
              <Text style={styles.text}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
        {userProfile && <FollowButton />}

        {/* Body Section  */}

        <View style={styles.body}>
          <View style={styles.row}>
            <Octocons name="primitive-dot" size={20} color={colors.secondary} />
            <Text style={styles.robotoBold}> Last activity : </Text>
            <Text style={styles.roboto}>
              {moment(!userProfile ? lastLogin : user?.lastLogin).format(
                'DD/MMM',
              )}
            </Text>
          </View>
          <View style={styles.row}>
            <Octocons name="primitive-dot" size={20} color={colors.black} />
            <Text style={styles.robotoBold}> Description : </Text>
          </View>
          <Text style={[styles.roboto]}>{description}</Text>
          <View style={styles.row}>
            <Octocons name="primitive-dot" size={20} color={colors.black} />
            <Text style={styles.robotoBold}> Interested in : </Text>
          </View>
          <Text style={[styles.roboto, styles.blue]}>
            {interestedIn?.map(tag => `#${tag} `)}
          </Text>
        </View>
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
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
  blue: {
    color: colors.blue,
  },
  closeImage: {position: 'absolute', top: 15, right: 15},
  header: {
    height: height * 0.25,
    margin: 7,
    padding: 5,
  },
  roboto: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTop: {
    flexDirection: 'row',
    flex: 6,
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
    borderColor: colors.black,
  },
  image: {
    borderColor: colors.black,
    borderWidth: 1,
    height: height * 0.13,
    width: height * 0.13,
    borderRadius: (height * 0.13) / 2,
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  robotoBold: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  text: {
    color: colors.black,
  },
  followButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 30,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: colors.white,
    backgroundColor: colors.white,
  },
});
