import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';

const ConversationUser = ({item}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: item.photoURL}} />
      <Text> {item.name} </Text>
    </View>
  );
};

export default ConversationUser;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.3,
    borderWidth: 2,
    borderColor: 'black',
  },
});
