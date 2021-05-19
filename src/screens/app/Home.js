import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const Home = () => {
  const user = useSelector(state => state.user);
  return (
    <View>
      <Text>Hello {user.name} </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
