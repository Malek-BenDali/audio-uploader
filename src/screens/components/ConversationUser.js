import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import {colors} from '../../assets';
import RBSheet from 'react-native-raw-bottom-sheet';
import ConversationUserDetail from './ConversationUserDetail';

const ConversationUser = ({item, active, setOpenMic, conversationId}) => {
  const refRBSheet = useRef();
  return (
    <Pressable
      onLongPress={() => refRBSheet.current.open()}
      style={styles.container}>
      <Image
        style={
          active === item.userUid ? [styles.image, styles.active] : styles.image
        }
        source={{uri: item.photoURL}}
      />
      <Text> {item.name} </Text>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={350}
        customStyles={{
          wrapper: {
            backgroundColor: '#000',
            opacity: 0.8,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            backgroundColor: colors.tertiary,
          },
        }}>
        <ConversationUserDetail
          conversationId={conversationId}
          setOpenMic={setOpenMic}
          item={item}
        />
      </RBSheet>
    </Pressable>
  );
};

export default ConversationUser;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.4,
    borderColor: 'black',
    marginBottom: 10,
  },
  active: {
    borderWidth: 5,
    borderColor: colors.secondary,
  },
});
