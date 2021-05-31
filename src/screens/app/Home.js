import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/actions/authAction';
import {HeaderButton} from '../../shared';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {colors} from '../../assets';
import {ConversationItem, HomeHeader} from '../components';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const [initialResults, setInitialResults] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      // headerShown: false,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName="search-circle-outline"
            onPress={() => {
              navigation.navigate('Search');
            }}
          />
          <Item
            title="Add"
            iconName="add-circle-outline"
            onPress={() => {
              navigation.navigate('CreateConversation');
            }}
          />
        </HeaderButtons>
      ),
      headerTitleStyle: {fontFamily: 'Roboto-Bold'},
      title: 'MaleksAPP',
    });
  }, []);
  useEffect(async () => {
    try {
      const a = await firestore().collection('Conversation').limit(50).get();
      let querySearch = [];
      a.docs.map(({_data}) => {
        querySearch.push(_data);
      });
      setInitialResults(querySearch);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const dispatch = useDispatch();
  console.log(initialResults);
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => <HomeHeader />}
        data={initialResults}
        keyExtractor={item => item.uid}
        renderItem={({item}) => <ConversationItem item={item} />}
      />
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
