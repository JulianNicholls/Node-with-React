// Show SurveyForm and SurveyReview

import React from 'react';

import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends React.Component {
  render() {
    return (
      <div className="container">
        <SurveyForm />
      </div>
    );
  }
}

export default SurveyNew;
