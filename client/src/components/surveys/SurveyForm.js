// Survey Form

import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import SurveyField from './SurveyField';
import FIELDS from './formFields';
import { validateEmails } from '../../utils/emailList';

class SurveyForm extends React.Component {
  renderFields = () => {
    return FIELDS.map(({ name, label, placeholder }) => (
      <Field
        key={name}
        component={SurveyField}
        type="text"
        name={name}
        label={label}
        placeholder={placeholder}
      />
    ));
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
        {this.renderFields()}
        <Link to="/surveys" className="btn-flat teal white-text">
          Cancel
        </Link>
        <button className="btn-flat indigo white-text right" type="submit">
          Next
          <i className="material-icons right">navigate_next</i>
        </button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  FIELDS.forEach(({ name, errorText }) => {
    if (!values[name]) errors[name] = errorText;
  });

  if (values.recipients) errors.recipients = validateEmails(values.recipients);

  return errors;
};

export default reduxForm({
  form: 'survey',
  validate
})(SurveyForm);
