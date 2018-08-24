import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

class Header extends Component {
  renderButtons = () => {
    const { auth } = this.props;

    switch (auth) {
      case null:
        return null;

      case false:
        return (
          <li>
            <a className="btn indigo" href="/auth/google">
              Log in with Google
            </a>
          </li>
        );

      default:
        const { displayName, credits } = auth;
        
        return [
          <li key="credits" style={{ marginRight: '1rem' }}>
            {displayName}, {credits !== 0 ? credits : 'No'} credits
          </li>,
          <li key="pay">
            <Payments />
          </li>,
          <li key="logout">
            <a href="/api/logout">Log out</a>
          </li>
        ];
    }
  };

  render() {
    return (
      <nav style={{ marginBottom: '10px' }}>
        <div
          className="nav-wrapper indigo darken-4"
          style={{ paddingLeft: '0.5rem' }}
        >
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            <img
              src="/images/emaily-logo-2.png"
              height="32px"
              alt="Emaily 2018 Logo"
              style={{ margin: '0 8px -5px 0' }}
            />
            Emaily
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
