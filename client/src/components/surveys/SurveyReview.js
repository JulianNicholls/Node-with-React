// Survey Review

import React from 'react';
import { reduxForm } from 'redux-form';

const SurveyReview = () => <h5>Survey Review</h5>;

export default reduxForm({
  form: 'survey'
})(SurveyReview);
