import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {updateFollowing, Unfollow} from '../../store/actions/socialAction';

const FollowItem = ({item}) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const isBelowThreshold = currentValue => currentValue.uid !== item.uid;

  const FollowButton = () => {
    if (user.following?.every(isBelowThreshold))
      return (
        <TouchableOpacity
          key={item.uid}
          style={[styles.followButton, styles.primaryBack]}
          onPress={() =>
            dispatch(
              updateFollowing({
                user,
                uid: item.uid,
                photoURL: item.photoURL,
                name: item.name,
                email: item.email,
              }),
            )
          }>
          <Text style={[styles.RobotoBold, styles.FollowText]}> Follow </Text>
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity
        style={[styles.followButton, styles.whiteBack]}
        onPress={() =>
          dispatch(
            Unfollow({
              user,
              uid: item.uid,
              photoURL: item.photoURL,
              name: item.name,
              email: item.email,
            }),
          )
        }>
        <Text style={[styles.RobotoBold, styles.unFollowText]}>unfollow</Text>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push('Profile', {uid: item.uid})}>
      <Image
        source={{
          uri: item.photoURL,
        }}
        style={styles.image}
      />
      <View style={styles.coords}>
        <Text style={styles.RobotoBold}>{item.name} </Text>
        <Text style={[styles.email, styles.Roboto]}>{item.email} </Text>
      </View>
      <FollowButton />
    </TouchableOpacity>
  );
};

export default FollowItem;
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 80,
  },
  coords: {
    flexDirection: 'column',
    width: width * 0.5,
    marginHorizontal: width * 0.02,
  },
  email: {
    opacity: 0.5,
  },
  followButton: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    width: width * 0.2,
  },
  primaryBack: {
    backgroundColor: colors.secondary,
  },
  whiteBack: {
    backgroundColor: colors.tertiary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  Roboto: {
    fontFamily: 'Roboto-Regular',
  },
  RobotoBold: {
    fontFamily: 'Roboto-Bold',
  },
  FollowText: {
    color: colors.white,
  },
  unFollowText: {
    color: colors.white,
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2,
  },
});
