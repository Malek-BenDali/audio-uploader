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
  followers: null,
  following: null,
  description: '',
  interestedIn: null,
  conversation: null,
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
    case actionTypes.UPDATE_FOLLOW: {
      return {
        ...state,
        followers: action.followers,
        following: action.following,
      };
    }
    default:
      return {...state, loading: false};
  }
};
