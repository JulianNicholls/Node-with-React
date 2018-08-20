import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import LandingPage from './LandingPage';

import { fetchUser } from '../actions/auth';

const Dashboard = () => (
  <div className="container">
    <h2>Dashboard</h2>
  </div>
);

const SurveyNew = () => (
  <div className="container">
    <h2>New Survey</h2>
  </div>
);

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />

            <Route path="/" exact component={LandingPage} />
            <Route path="/surveys" exact component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
