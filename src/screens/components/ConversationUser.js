import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {colors} from '../../assets';

const ConversationUser = ({item, active}) => {
  return (
    <View style={styles.container}>
      <Image
        style={
          active === item.userUid ? [styles.image, styles.active] : styles.image
        }
        source={{uri: item.photoURL}}
      />
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
    width: width * 0.4,
    borderColor: 'black',
    marginBottom: 10,
  },
  active: {
    borderWidth: 5,
    borderColor: colors.secondary,
  },
});
