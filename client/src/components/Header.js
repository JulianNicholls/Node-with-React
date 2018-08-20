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
            <a className="waves-effect waves-light btn" href="/auth/google">
              Log in with Google
            </a>
          </li>
        );

      default:
        return [
          <li key="credits" style={{ marginRight: '1rem' }}>
            {auth.displayName} - {auth.credits !== 0 ? auth.credits : 'No'}{' '}
            credits
          </li>,
          <li key="pay">
            <Payments />
          </li>,
          // <li key="name" style={{ marginLeft: '1rem' }}>
          //   {auth.displayName}
          // </li>,
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
              src="/images/emaily-logo-tr.png"
              height="32px"
              alt="Emaily 2018 Logo"
              style={{ marginRight: '8px' }}
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
