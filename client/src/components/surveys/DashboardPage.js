import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => (
  <div className="container">
    <h2>Surveys</h2>
    <div className="fixed-action-btn">
      <Link to="/surveys/new" className="btn-floating btn-large indigo">
        <i className="material-icons">add</i>
      </Link>
    </div>
  </div>
);

export default DashboardPage;
