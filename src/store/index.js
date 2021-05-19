import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/authReducer';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const reducers = combineReducers({user: AuthReducer});

const persistStateReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistStateReducer, compose(applyMiddleware(thunk)));
const persistor = persistStore(store);

export {persistor, store};
