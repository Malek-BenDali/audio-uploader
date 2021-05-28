import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {FollowList} from '../../../shared';
import {colors} from '../../../assets';

const Followers = ({data}) => {
  return (
    <View style={styles.container}>
      <FollowList data={data} />
    </View>
  );
};

export default Followers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
