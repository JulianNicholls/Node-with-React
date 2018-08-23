import React from 'react';

const SurveyField = ({ input, label, placeholder, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        {...input}
        placeholder={placeholder}
        style={{ marginBottom: '25px' }}
      />
      {touched &&
        error && (
          <div
            className="red-text text-darken-2"
            style={{ marginTop: '-20px', marginBottom: '5px' }}
          >
            {error}
          </div>
        )}
    </div>
  );
};

export default SurveyField;
