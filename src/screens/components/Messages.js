import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
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

const Messages = () => {
  const [audioFile, setAudioFile] = useState('');
  const [recording, setRecording] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(true);
  const [pressed, setpressed] = useState(false);

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
    console.log('stop record');
    let audioFile = await audioRecord.stop();
    console.log('audioFile', audioFile);
    // setOptions({...options, audioFile, recording: false});
    setAudioFile(audioFile);
    await uploadFile(audioFile);
    setRecording(false);
  };

  const uploadFile = async audioFile => {
    let filename = uuid.v4() + '.wav';
    try {
      // console.log('here', audioFile);
      await storage().ref(filename).putFile(audioFile);
      const uri = await storage().ref(filename).getDownloadURL();
      console.log(uri);
    } catch (err) {
      console.log(err);
    }
  };

  const load = () => {
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

  const play = async () => {
    if (!loaded) {
      try {
        await load();
      } catch (error) {
        console.log(error);
      }
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
    // start();
    setpressed(true);
  };
  const lacher = () => {
    setpressed(false);
  };

  return (
    <View style={styles.container}>
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
