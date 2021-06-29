import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Pressable} from 'react-native';
import {colors} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const ConversationItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Conversation', {
          conversationId: item.uid,
          title: item.title,
          uri: item.image,
        })
      }
      style={styles.container}>
      <ImageBackground
        source={{uri: item.image}}
        style={styles.imageBackground}>
        <View style={styles.photo}></View>
        <View style={styles.mainContent}>
          <Text style={[styles.title, styles.robotoBold]}>{item.title} </Text>
          <Text>about {item.about}</Text>
          <Text>
            <Text style={styles.robotoBold}> {item.participants.length} </Text>
            participants
          </Text>
          <View style={styles.row}>
            {item.tags.map(tag => (
              <Text style={styles.blue}>#{tag} </Text>
            ))}
          </View>
          <Text style={styles.status}>
            active since {moment(item.createdAt).format('MM/DD')}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default ConversationItem;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  row: {flexDirection: 'row'},
  imageBackground: {
    width: '100%',
    height: 200,
    borderWidth: 5,
    borderColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
  },
  photo: {
    flex: 5,
  },
  mainContent: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flex: 5,
    backgroundColor: colors.primary,
    opacity: 0.8,
    paddingLeft: 20,
  },
  blue: {
    color: colors.blue,
  },
  robotoBold: {
    fontFamily: 'Roboto-Bold',
  },
  title: {
    fontSize: 20,
  },
  status: {
    position: 'absolute',
    right: 15,
    bottom: 0,
    color: colors.black,
  },
});
