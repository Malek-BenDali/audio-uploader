import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/actions/authAction';
import {HeaderButton} from '../../shared';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {colors} from '../../assets';
import {ConversationItem, HomeHeader} from '../components';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const [initialResults, setInitialResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getConversations = async () => {
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
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getConversations();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getConversations();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => <HomeHeader />}
        data={initialResults}
        renderItem={({item}) => <ConversationItem item={item} />}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primary},
});
