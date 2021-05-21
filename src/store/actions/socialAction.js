import {START_REQUEST, UPDATE_FOLLOW} from './TYPES';

export const updateFollow = payload => {
  return dispatch => {
    dispatch({
      type: UPDATE_FOLLOW,
      payload,
    });
  };
};
