import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text>Hola</Text>
      </Pressable>
      <View style={{flexDirection: 'row'}}>
        <Text>Hola</Text>
        <Text>Hola</Text>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
});
