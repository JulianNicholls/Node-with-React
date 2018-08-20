import axios from 'axios';

import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, user: response.data });
};

export const addCredits = token => dispatch => {
  const response = axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, user: response.data });
};
