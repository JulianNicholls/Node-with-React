import React from 'react';

const SurveyField = ({ input, label, placeholder, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        {...input}
        placeholder={placeholder}
        style={{ marginBottom: '5px' }}
      />
      {touched && (
        <div className="red-text" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default SurveyField;
