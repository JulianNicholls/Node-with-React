import { FETCH_USER } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.user;

    default:
      return state;
  }
};
