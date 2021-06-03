import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../../assets';
import {HeaderButton} from '../../../shared';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import {
  addConversation,
  removeConversation,
} from '../../../store/actions/socialAction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HeaderConversation, Messages} from '../../components';

const Conversation = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [member, setMember] = useState(false);
  const {title, conversationId} = route.params;
  const {uid, photoURL, name} = useSelector(state => state.user);
  const userConversation = useSelector(state => state.user.conversation);

  const addMember = async () => {
    await firestore()
      .collection('Conversation')
      .doc(conversationId)
      .update({
        participants: firestore.FieldValue.arrayUnion({
          userUid: uid,
          photoURL,
          name,
        }),
      });
    await firestore()
      .collection('Users')
      .doc(uid)
      .update({
        conversation: firestore.FieldValue.arrayUnion(conversationId),
      });
    dispatch(addConversation(conversationId));
  };
  const removeMember = async () => {
    await firestore()
      .collection('Conversation')
      .doc(conversationId)
      .update({
        participants: firestore.FieldValue.arrayRemove({
          userUid: uid,
          photoURL,
          name,
        }),
      });
    await firestore()
      .collection('Users')
      .doc(uid)
      .update({
        conversation: firestore.FieldValue.arrayRemove(conversationId),
      });
    dispatch(removeConversation(conversationId));
  };

  const getUpdates = async () => {
    setLoading(true);
    const a = await firestore()
      .collection('Conversation')
      .doc(conversationId)
      .get();
    setData(a.data());

    const result = a
      .data()
      .participants.find(currentValue => currentValue.userUid === uid);
    console.log(result?.userUid === uid);
    setMember(result?.userUid);

    setLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: member == undefined ? false : true,
      title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <TouchableOpacity>
            <Ionicons
              name={member ? 'exit-outline' : 'add'}
              size={35}
              onPress={() => (member ? removeMember() : addMember())}
            />
          </TouchableOpacity>
        </HeaderButtons>
      ),
    });
  }, [member]);

  useEffect(() => {
    getUpdates();
  }, [userConversation]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Conversation')
      .doc(conversationId)
      .onSnapshot(doc => {
        setData(oldstate => ({
          ...oldstate,
          participants: doc.data().participants,
        }));
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [conversationId]);
  console.log(data);
  return loading ? (
    <ActivityIndicator size="large" color={colors.secondary} />
  ) : member ? (
    <Messages
      participants={data.participants}
      messagesId={data.messages}
      userUid={uid}
    />
  ) : (
    <HeaderConversation data={data} addMember={addMember} />
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
