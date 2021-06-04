import React from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const HomeHeader = () => {
  const navigation = useNavigation();
  const userphotoURL = useSelector(state => state.user.photoURL);
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.headerTitle}>AudioStory</Text>
      </Pressable>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={styles.Buttons}
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <Ionicons size={40} name="search-circle-outline" />
        </Pressable>
        <Pressable
          style={styles.Buttons}
          onPress={() => {
            navigation.navigate('CreateConversation');
          }}>
          <Ionicons size={40} name="add-circle-outline" />
        </Pressable>
        <Pressable
          style={styles.Buttons}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            source={{uri: userphotoURL}}
            style={{width: 40, height: 40, borderRadius: 17}}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  Buttons: {
    marginRight: 10,
  },
  headerTitle: {
    fontFamily: 'Lobster-Regular',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
