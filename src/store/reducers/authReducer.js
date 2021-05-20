import * as actionTypes from '../actions/TYPES';

const initialState = {
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
    default:
      return state;
  }
};
