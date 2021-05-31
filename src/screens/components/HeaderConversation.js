import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import {ImageHeaderScrollView} from 'react-native-image-header-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const HeaderConversation = ({addMember, data}) => {
  const {
    image,
    about,
    createdAd,
    moderator,
    description,
    participants,
    tags,
    title,
  } = data;
  const [owner, setOwner] = useState();
  useEffect(async () => {
    const user = await (
      await firestore().collection('Users').doc(moderator).get()
    ).data();
    setOwner(user);
  }, []);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageHeaderScrollView
        maxHeight={250}
        minHeight={80}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.1}
        headerImage={{uri: image}}
        renderFixedForeground={() => (
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons size={40} name="arrow-back" color={colors.primary} />
            </Pressable>
            <Text style={styles.title}>{title} </Text>
            <Pressable onPress={addMember}>
              <Ionicons size={40} name="add" color={colors.primary} />
            </Pressable>
          </View>
        )}>
        <View style={styles.mainContent}>
          <View style={[styles.displayText, styles.column]}>
            <Animatable.Text
              animation="bounceIn"
              style={[styles.info, styles.robotoBold]}>
              Conversation Owner :
            </Animatable.Text>
            <Animatable.Image
              source={{uri: owner?.photoURL}}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: colors.black,
              }}
            />
            <Animatable.Text
              style={styles.info}
              delay={500}
              animation="bounceInDown">
              {` ${owner?.name}`}
            </Animatable.Text>
            <Animatable.Text
              style={styles.info}
              delay={500}
              animation="bounceInDown">
              {` ${owner?.email}`}
            </Animatable.Text>
          </View>
          <View style={styles.displayText}>
            <Animatable.Text
              animation="bounceIn"
              style={[styles.info, styles.robotoBold]}>
              About :
            </Animatable.Text>
            <Animatable.Text
              style={styles.info}
              delay={500}
              animation="bounceInDown">
              {` ${about}`}
            </Animatable.Text>
          </View>
          <View style={styles.displayText}>
            <Animatable.Text
              animation="bounceIn"
              style={[styles.info, styles.robotoBold]}>
              participants :
            </Animatable.Text>
            <Animatable.Text
              style={styles.info}
              delay={500}
              animation="bounceInDown">
              {` ${participants.length}`}
            </Animatable.Text>
          </View>
          <View style={[styles.displayText, styles.column]}>
            <Animatable.Text
              animation="bounceIn"
              style={[styles.info, styles.robotoBold]}>
              Description :
            </Animatable.Text>
            <Animatable.Text
              style={styles.info}
              delay={500}
              animation="bounceInDown">
              {` ${description}`}
            </Animatable.Text>
          </View>
          <View style={styles.displayText}>
            <Animatable.Text
              animation="bounceIn"
              style={[styles.info, styles.robotoBold]}>
              Created At :
            </Animatable.Text>
            <Animatable.Text
              style={styles.info}
              delay={500}
              animation="bounceInDown">
              {` ${moment(createdAd).format('DD/MMM/YYYY')}`}
            </Animatable.Text>
          </View>
          <View style={styles.displayText}>
            <Animatable.Text
              animation="bounceIn"
              style={[styles.info, styles.robotoBold]}>
              Tags :
            </Animatable.Text>
            <Animatable.Text
              delay={500}
              animation="bounceInDown"
              style={styles.info}>
              {tags.length ? tags.map(tag => ' #' + tag) : ' No tags'}
            </Animatable.Text>
          </View>
        </View>
      </ImageHeaderScrollView>
    </View>
  );
};

export default HeaderConversation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: colors.primary,
    fontSize: 27,
    marginTop: 5,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  mainContent: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    height: Dimensions.get('window').height * 0.9,
  },
  robotoBold: {
    fontFamily: 'Roboto-Bold',
  },
  info: {
    fontSize: 20,
  },
  displayText: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
});
