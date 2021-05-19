import * as actionTypes from '../actions/TYPES';

const initialState = {
  isSignedIn: false,
  name: '',
  email: null,
  photoURL: null,
  uid: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
      const {displayName, email, photoURL, uid} = action.payload;
      return {
        ...state,
        isSignedIn: true,
        name: displayName,
        email,
        photoURL,
        uid,
      };
  }
  return state;
};