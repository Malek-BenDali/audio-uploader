import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Conversation = ({navigation, route}) => {
  console.log(route.params);
  useEffect(async () => {
    navigation.setOptions({
      title: 'Conver name',
    });
  }, []);

  return (
    <View>
      <Text>Conversation Screen</Text>
    </View>
  );
};

export default Conversation;

const styles = StyleSheet.create({});
