import axios from 'axios';

import { FETCH_USER, FETCH_SURVEYS, FETCH_DETAIL } from './types';

// Return the logged in user, or null
export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, user: response.data });
};

// Add credits to the logged in user, and return him
export const addCredits = token => async dispatch => {
  const response = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, user: response.data });
};

// Add a new survey for the logged in user, and return here
export const submitSurvey = (values, history) => async dispatch => {
  const response = await axios.post('/api/add_survey', values);

  history.push('/surveys');

  dispatch({ type: FETCH_USER, user: response.data });
};

// Return the surveys for the logged in user
export const fetchSurveys = () => async dispatch => {
  const response = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, surveys: response.data });
};

// Return the detail for the selected survey
export const fetchDetail = id => async dispatch => {
  const response = await axios.get(`/api/survey/${id}`);

  dispatch({ type: FETCH_DETAIL, detail: response.data });
};
