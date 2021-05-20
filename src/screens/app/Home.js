import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/actions/authAction';
import {HeaderButton} from '../../shared';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {BlurView} from '@react-native-community/blur';

const Home = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerCenter: () => <Text>Home</Text>,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName="person"
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {}}
          />
        </HeaderButtons>
      ),
      headerTintColor: 'blue',
    });
  }, []);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, backgroundColor: '#9eecff'}}>
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
