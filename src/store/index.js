import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {authReducer, socialReducer} from './reducers';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import PushNotification from 'react-native-push-notification';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const reducers = combineReducers({user: authReducer});

const persistStateReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistStateReducer, compose(applyMiddleware(thunk)));
const persistor = persistStore(store);

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
});

export {persistor, store};
