import React from 'react';
import { Link } from 'react-router-dom';

import SurveyList from './SurveyList';

const DashboardPage = () => (
  <div className="container">
    <h5 style={{ textAlign: 'center' }}>Surveys</h5>

    <SurveyList />

    <div className="fixed-action-btn">
      <Link to="/surveys/new" className="btn-floating btn-large indigo">
        <i className="material-icons">add</i>
      </Link>
    </div>
  </div>
);

export default DashboardPage;
