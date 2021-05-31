import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/actions/authAction';
import {HeaderButton} from '../../shared';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {colors} from '../../assets';
import {ConversationItem, HomeHeader} from '../components';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const [initialResults, setInitialResults] = useState([]);

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
  // console.log(initialResults);
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => <HomeHeader />}
        data={initialResults}
        keyExtractor={item => item.uid}
        renderItem={({item}) => <ConversationItem item={item} />}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primary},
});
