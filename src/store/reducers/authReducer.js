import * as actionTypes from '../actions/TYPES';

const initialState = {
  isSignedIn: false,
  loading: false,
  uid: null,
  email: '',
  photoURL: '',
  name: '',
  createdAt: '',
  lastLogin: '',
  followers: [],
  following: [],
  description: '',
  interestedIn: [],
  conversation: [],
  notifications: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
      if (action.payload) {
        const {
          uid,
          email,
          photoURL,
          name,
          createdAt,
          lastLogin,
          followers,
          following,
          description,
          interestedIn,
          conversation,
          notifications,
        } = action.payload;
        return {
          ...state,
          loading: false,
          isSignedIn: true,
          uid,
          email,
          photoURL,
          name,
          createdAt,
          lastLogin,
          followers,
          following,
          description,
          interestedIn,
          conversation,
          notifications,
        };
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        loading: false,
        isSignedIn: false,
        uid: null,
        email: '',
        photoURL: '',
        name: '',
        createdAt: '',
        lastLogin: '',
        followers: null,
        following: null,
        description: '',
        interestedIn: null,
        conversation: null,
      };
    case actionTypes.START_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.UPDATE_FOLLOWER: {
      return {
        ...state,
        followers: action.payload.followers,
      };
    }
    case actionTypes.UPDATE_FOLLOWGIN: {
      return {
        ...state,
        following: action.payload.following,
      };
    }
    default:
      return {...state, loading: false};
  }
};
