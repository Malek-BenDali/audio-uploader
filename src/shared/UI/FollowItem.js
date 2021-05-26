import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors} from '../../assets';
import {useNavigation} from '@react-navigation/native';

const FollowItem = ({item}) => {
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
      <TouchableOpacity
        style={styles.followButton}
        onPress={() => console.log('follow')}>
        <Text style={[styles.RobotoBold, styles.FollowText]}>FOLLOW</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default FollowItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 80,
  },
  coords: {flexDirection: 'column'},
  email: {
    opacity: 0.5,
  },
  followButton: {
    backgroundColor: colors.primary,
    height: '50%',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
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
  image: {width: 75, height: 75, borderRadius: 75 / 2},
});
