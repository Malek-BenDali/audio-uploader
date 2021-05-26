import React from 'react';
import {FlatList} from 'react-native';
import FollowItem from './FollowItem';

export default props => (
  <FlatList
    {...props}
    data={props.data}
    renderItem={({item}) => <FollowItem item={item} />}
  />
);
