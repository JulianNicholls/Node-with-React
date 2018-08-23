// Survey Review

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import FIELDS from './formFields';

const SurveyReview = ({ onBack, values, submitSurvey, history }) => {
  const surveyFields = FIELDS.map(({ name, label }) => (
    <tr key={name}>
      <th style={{ width: '10em' }}>{label}</th>
      <td>{values[name]}</td>
    </tr>
  ));

  return (
    <div>
      <h5 style={{ textAlign: 'center' }}>Please confirm your entries</h5>
      <table style={{ border: '1px solid #ddd', marginBottom: '1rem' }}>
        <tbody>{surveyFields}</tbody>
      </table>

      <button className="btn-flat teal white-text" onClick={onBack}>
        Back
      </button>

      <button
        className="btn-flat indigo white-text right"
        onClick={() => submitSurvey(values, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  values: state.form.survey.values
});

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyReview));
