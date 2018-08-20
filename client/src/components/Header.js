import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderButton = () => {
    switch (this.props.auth) {
      case null:
        return null;

      case false:
        return (
          <li>
            <a href="/auth/google">Log in with Google</a>
          </li>
        );

      default:
        return (
          <Fragment>
            <li>{this.props.auth.displayName}</li>
            <li>
              <a href="/api/logout">Log out</a>
            </li>
          </Fragment>
        );
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
          <ul className="right">{this.renderButton()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
