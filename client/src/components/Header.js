import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderButton() {
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
  }

  render() {
    return (
      <nav>
        <div
          className="nav-wrapper indigo darken-4"
          style={{ paddingLeft: '0.5rem' }}
        >
          <a className="left brand-logo" href="/">
            Emaily 2018
          </a>
          <ul className="right">{this.renderButton()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
