import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
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
          <ul className="right">
            {this.props.auth.googleID ? (
              <React.Fragment>
                <li>{this.props.auth.displayName}</li>
                <li>
                  <a href="/api/logout">Log out</a>
                </li>
              </React.Fragment>
            ) : (
              <li>
                <a href="/auth/google">Log in with Google</a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);
