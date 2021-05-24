import {START_REQUEST, UPDATE_FOLLOWER, UPDATE_FOLLOWGIN} from './TYPES';
import {newFollower} from '../../shared/Notifications';

export const updateFollowers = payload => {
  return dispatch => {
    newFollower('new follower', 'he begins to follow u');
    dispatch({
      type: UPDATE_FOLLOWER,
      payload,
    });
  };
};

export const updateFollowing = payload => {
  return dispatch => {
    dispatch({
      type: UPDATE_FOLLOWGIN,
      payload,
    });
  };
};
