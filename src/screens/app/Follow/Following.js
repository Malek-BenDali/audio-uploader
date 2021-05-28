import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FollowList} from '../../../shared';
import {colors} from '../../../assets';

const Following = ({data}) => {
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
