import React from 'react';
import {FlatList} from 'react-native';
import FollowItem from './FollowItem';

export default props => (
  <FlatList
    {...props}
    keyExtractor={item => item.id}
    renderItem={({item}) => <FollowItem item={item} />}
  />
);
