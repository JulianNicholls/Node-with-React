import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';

import { fetchUser } from '../actions/auth';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>New Survey</h2>;
const LandingPage = () => <h2>Landing Page</h2>;

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
