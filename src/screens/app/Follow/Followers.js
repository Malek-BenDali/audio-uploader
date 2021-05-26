import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {FollowList} from '../../../shared';
import {colors} from '../../../assets';

const Followers = () => {
  const followers = useSelector(state => state.user.followers);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .where('uid', 'in', followers)
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator /> : <FollowList data={users} />}
    </View>
  );
};

export default Followers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
