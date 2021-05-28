import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';
import {FollowList} from '../../../shared';
import {colors} from '../../../assets';

const Following = ({data}) => {
  console.log('Following', data);
  return (
    <View style={styles.container}>
      <FollowList data={data} />
    </View>
  );
};

export default Following;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
