import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/actions/authAction';
import {HeaderButton} from '../../shared';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {colors} from '../../assets';

const Home = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName="search-circle-outline"
            onPress={() => {
              navigation.navigate('Search');
            }}
          />
          <Item title="Add" iconName="add-circle-outline" onPress={() => {}} />
        </HeaderButtons>
      ),
      headerTitleStyle: {fontFamily: 'Roboto-Bold'},
      title: 'MaleksAPP',
    });
  }, []);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
});
