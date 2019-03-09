import { FETCH_SURVEYS, FETCH_DETAIL } from '../actions/types';

export const detailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DETAIL:
      return action.detail;

    default:
      return state;
  }
};

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.surveys;

    default:
      return state;
  }
};
