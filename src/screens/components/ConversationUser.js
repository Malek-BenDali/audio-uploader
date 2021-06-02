import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {colors} from '../../assets';
import {useSelector} from 'react-redux';

const ConversationUser = ({item, active}) => {
  const uid = useSelector(state => state.user.uid);
  return (
    <View style={styles.container}>
      <Image
        style={active === uid ? [styles.image, styles.active] : styles.image}
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
  },
  active: {
    borderWidth: 5,
    borderColor: colors.secondary,
  },
});
