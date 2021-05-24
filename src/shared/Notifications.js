import PushNotification from 'react-native-push-notification';

export const newFollower = (title = 'name', message = 'message') => {
  PushNotification.localNotification({
    title,
    message,
    channelId: '123',
  });
};
