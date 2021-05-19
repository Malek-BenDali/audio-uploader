import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/actions/authAction';

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Hello {user.name} </Text>
      <Button
        title="logout"
        onPress={() => {
          dispatch(logout());
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
