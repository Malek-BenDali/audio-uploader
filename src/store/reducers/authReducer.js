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
      action.payload;
      return {
        ...state,
        followers: [...state.followers, action.followers],
      };
    }
    case actionTypes.UPDATE_FOLLOWGIN: {
      return {
        ...state,
        following: [...state.following, action.payload],
      };
    }
    case actionTypes.DELETE_FOLLOWING: {
      const FollowersList = state.following.filter(
        object => object.uid !== action.payload.uid,
      );
      return {
        ...state,
        following: FollowersList,
      };
    }
    case actionTypes.ADD_CONVERSATION: {
      return {
        ...state,
        conversation: [...state.conversation, action.payload.conversationId],
      };
    }
    default:
      return {...state, loading: false};
  }
};
