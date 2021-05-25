import PushNotification from 'react-native-push-notification';

export const newFollower = (
  title = 'name',
  message = 'message',
  largeIconUrl,
) => {
  PushNotification.localNotification({
    title,
    message,
    largeIconUrl,
    channelId: '123',
    invokeApp: true,
  });
};
