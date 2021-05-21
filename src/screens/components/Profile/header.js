import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const header = () => {
  return (
    <View style={styles.header}>
      {/* photo and name section  */}
      <View style={styles.headerTop}>
        <Pressable onPress={() => setOpenImage(true)}>
          <Image
            source={{
              uri: photoURL,
            }}
            style={styles.image}
          />
        </Pressable>
        <View style={styles.headerTopInfo}>
          <Text style={[styles.userName, styles.text]}>{name}</Text>
          <Text style={[styles.userEmail, styles.text]}>{email}</Text>
        </View>
      </View>
      <View style={styles.headerBottom}>
        <View style={styles.box}>
          <Text style={styles.text}>{followers.length}</Text>
          <Text style={styles.text}>Followers</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>{following.length} </Text>
          <Text style={styles.text}>Followers</Text>
        </View>
      </View>
    </View>
  );
};

export default header;

const styles = StyleSheet.create({
  header: {
    height: height * 0.25,
    // backgroundColor: 'red',
    margin: 7,
    padding: 5,
  },
  headerTop: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
    flex: 5,
  },
});
