import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import LandingPage from './LandingPage';
import DashboardPage from './surveys/DashboardPage';
import SurveyNew from './surveys/SurveyNew';

import { fetchUser } from '../actions';

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
            <Route path="/surveys" exact component={DashboardPage} />
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
