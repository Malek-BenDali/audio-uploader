import React, {useEffect, useState} from 'react';
import {StyleSheet, Pressable, View, TextInput} from 'react-native';
import {colors} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {FollowList} from '../../shared';
import {useSelector} from 'react-redux';

const Search = ({navigation}) => {
  const [searchedText, setSearchedText] = useState('');
  const [results, setResults] = useState([]);
  const name = useSelector(state => state.user.name);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const getUsers = async () => {
    try {
      console.log('called');
      const a = await firestore()
        .collection('Users')
        .where('name', '>=', searchedText)
        .where('name', '!=', name)
        .get();
      // .limit(5);
      // .where('name', '<=', searchedText)
      // console.log(a);
      let querySearch = [];
      a.docs.map(({_data}) => {
        querySearch.push(_data);
      });
      setResults(querySearch);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = text => {
    setSearchedText(text);
    console.log(searchedText);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerInput}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons size={30} name="arrow-back" />
        </Pressable>
        <TextInput
          style={styles.input}
          onChangeText={text => handleChange(text)}
          placeholder={'Search'}
          value={searchedText}
          onSubmitEditing={() => getUsers()}
        />
      </View>
      <FollowList data={results} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
  },
});
