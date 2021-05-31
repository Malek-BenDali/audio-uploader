import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../assets';
//   useEffect(async () => {
//     const a = await firestore().collection('Conversation').doc(item.uid).get();
//     console.log(a);
//   }, []);

const ConversationItem = ({item}) => {
  // console.log('item', item);
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        source={{uri: item.image}}
        style={styles.imageBackground}>
        <View style={styles.photo}></View>
        <View style={styles.mainContent}></View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ConversationItem;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  imageBackground: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',
  },
  photo: {
    flex: 5,
  },
  mainContent: {
    flex: 4,
    backgroundColor: 'white',
    opacity: 0.8,
  },
});
