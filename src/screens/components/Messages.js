import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Button,
  Dimensions,
} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import {Buffer} from 'buffer';
import Sound from 'react-native-sound';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../assets';
import ConversationUser from './ConversationUser';
import firestore from '@react-native-firebase/firestore';

const Messages = ({participants, messagesId, userUid}) => {
  const [audioFile, setAudioFile] = useState('');
  const [recording, setRecording] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(true);
  const [pressed, setpressed] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Messages')
      .doc(messagesId)
      .onSnapshot(doc =>
        play(doc.data().vocal[doc.data().vocal.length - 1].audioURL),
      );

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [messagesId]);

  const audioRecord = AudioRecord;
  let sound = null;

  useEffect(async () => {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav',
    };

    audioRecord.init(options);

    audioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
      // do something with audio chunk
    });
  }, []);

  const start = () => {
    console.log('start record');
    setAudioFile('');
    setRecording(true);
    setLoaded(false);
    audioRecord.start();
  };

  const stop = async () => {
    if (!recording) return;
    let audioFile = await audioRecord.stop();
    await uploadFile(audioFile);

    setRecording(false);
  };

  const uploadFile = async audioFile => {
    let filename = uuid.v4() + '.wav';
    try {
      await storage().ref(filename).putFile(audioFile);
      const uri = await storage().ref(filename).getDownloadURL();
      await saveMessage(uri);
    } catch (err) {
      console.log(err);
    }
  };
  const saveMessage = async audioURL => {
    await firestore()
      .collection('Messages')
      .doc(messagesId)
      .update({
        vocal: firestore.FieldValue.arrayUnion({userUid, audioURL}),
      });
  };

  const load = audioFile => {
    return new Promise((resolve, reject) => {
      if (!audioFile) {
        return reject('file path is empty');
      }

      sound = new Sound(audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        // setOptions({...options, loaded: true});
        setLoaded(true);
        return resolve();
      });
    });
  };

  const play = async audioFile => {
    try {
      await load(audioFile);
    } catch (error) {
      console.log(error);
    }

    // setOptions({...options, paused: false});
    setPaused(false);
    Sound.setCategory('Playback');

    sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      // setOptions({...options, paused: true});
      setPaused(true);
      // this.sound.release();
    });
  };
  const record = () => {
    setpressed(true);
    start();
  };
  const lacher = () => {
    setpressed(false);
    stop();
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.usersList}
        data={participants}
        numColumns={3}
        renderItem={({item}) => <ConversationUser item={item} />}
        keyExtractor={item => item.userUid}
      />
      <Pressable
        style={[styles.micButton, pressed && styles.micButtonPressed]}
        onPressIn={() => record()}
        onPressOut={() => lacher()}>
        <Ionicons
          name="mic"
          size={width * 0.15}
          color={pressed ? colors.secondary : colors.black}
        />
      </Pressable>
    </View>
  );
  // return (
  //   <View style={styles.container}>
  //     <View style={styles.row}>
  //       <Button onPress={start} title="Record" disabled={recording} />
  //       <Button onPress={stop} title="Stop" disabled={!recording} />

  //       <Button onPress={play} title="Play" disabled={!audioFile} />
  //     </View>
  //   </View>
  // );
};

export default Messages;

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  usersList: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 40,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    padding: 40,
  },
  micButton: {
    height: width * 0.3,
    width: width * 0.3,
    position: 'absolute',
    bottom: 25,
    textAlign: 'center',
    right: width * 0.35,
    borderRadius: width * 0.15,
    borderWidth: 4,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButtonPressed: {
    borderColor: colors.secondary,
  },
});
