// Show SurveyForm and SurveyReview

import React from 'react';

import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends React.Component {
  state = {
    showReview: false
  };

  renderContent() {
    const { showReview } = this.state;

    if (showReview) {
      return (
        <SurveyReview
          onBack={() => this.setState(() => ({ showReview: false }))}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState(() => ({ showReview: true }))}
      />
    );
  }
  render() {
    return <div className="container">{this.renderContent()}</div>;
  }
}

// Connect to reduxForm to clear out the fields when cancelled
// because this component will unmount and thereby clear the field
export default reduxForm({
  form: 'survey'
})(SurveyNew);
