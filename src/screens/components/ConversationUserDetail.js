import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const ConversationUserDetail = ({
  item,
  conversationId,
  setOpenMic,
  moderator,
}) => {
  console.log('moderator', moderator);
  const mute = async () => {
    try {
      await firestore()
        .collection('Conversation')
        .doc(conversationId)
        .update({
          participants: firestore.FieldValue.arrayRemove({
            userUid: item.userUid,
            name: item.name,
            photoURL: item.photoURL,
            openMic: true,
          }),
        });
      await firestore()
        .collection('Conversation')
        .doc(conversationId)
        .update({
          participants: firestore.FieldValue.arrayUnion({
            userUid: item.userUid,
            name: item.name,
            photoURL: item.photoURL,
            openMic: false,
          }),
        });
      setOpenMic(false);
    } catch (err) {
      console.log('error muting', err);
    }
  };
  const unmute = async () => {
    try {
      await firestore()
        .collection('Conversation')
        .doc(conversationId)
        .update({
          participants: firestore.FieldValue.arrayRemove({
            userUid: item.userUid,
            name: item.name,
            photoURL: item.photoURL,
            openMic: false,
          }),
        });
      await firestore()
        .collection('Conversation')
        .doc(conversationId)
        .update({
          participants: firestore.FieldValue.arrayUnion({
            userUid: item.userUid,
            name: item.name,
            photoURL: item.photoURL,
            openMic: true,
          }),
        });
      setOpenMic(true);
    } catch (err) {
      console.log('error muting', err);
    }
  };

  const kick = async () => {
    await firestore()
      .collection('Conversation')
      .doc(conversationId)
      .update({
        participants: firestore.FieldValue.arrayRemove({
          userUid: item.userUid,
          photoURL: item.photoURL,
          name: item.name,
          openMic: item.openMic,
        }),
      });
    await firestore()
      .collection('Users')
      .doc(item.userUid)
      .update({
        conversation: firestore.FieldValue.arrayRemove(conversationId),
      });
  };

  return (
    <View
      style={{
        backgroundColor: colors.white,
        flex: 1,
        padding: 15,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image style={styles.image} source={{uri: item.photoURL}} />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 20,
            justifyContent: 'center',
          }}>
          <Text style={{fontFamily: 'Roboto-Bold', fontSize: 24}}>
            {item.name}
          </Text>
        </View>
      </View>
      {moderator && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              item.openMic ? mute() : unmute();
            }}>
            <Ionicons
              name={item.openMic ? 'mic-off' : 'mic'}
              size={25}
              color={colors.red}
            />
            <Text style={styles.buttonText}>
              {item.openMic ? 'Mute' : 'Unmute'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => kick()}>
            <Ionicons name="exit-outline" size={25} color={colors.red} />
            <Text style={styles.buttonText}>kick</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ConversationUserDetail;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 20,
    marginLeft: 5,
  },
  button: {
    alignSelf: 'center',
    marginTop: 15,
    width: width * 0.8,
    borderWidth: 1,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
});
