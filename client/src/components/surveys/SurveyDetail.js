import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchDetail } from '../../actions';
import formatDate from '../../utils/dates';

const tableStyle = {
  maxWidth: '80%',
  margin: '1rem auto',
};

const headerStyle = {
  width: '12rem',
};

const narrowStyle = {
  width: '3rem',
};

class SurveyDetail extends Component {
  componentDidMount() {
    this.props.fetchDetail(this.props.match.params.id);
  }

  recipientList = () => {
    return this.props.detail.recipients.map(({ responded, email, _id }) => {
      return (
        <Fragment key={_id}>
          {email} {responded && '(R)'}
          <br />
        </Fragment>
      );
    });
  };

  render() {
    const { id } = this.props.match.params;

    if (this.props.detail._id) {
      const {
        title,
        subject,
        body,
        dateSent,
        lastResponded,
        yes,
        no,
        recipients,
      } = this.props.detail;

      return (
        <div>
          <h5 style={{ textAlign: 'center' }}>{title}</h5>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <th style={headerStyle}>Subject Line</th>
                <td colSpan="4">{subject}</td>
              </tr>

              <tr>
                <th style={headerStyle}>Question</th>
                <td colSpan="4">{body}</td>
              </tr>

              <tr>
                <th style={headerStyle}>Recipients</th>
                <td colSpan="4">
                  {recipients.length}
                  <br />
                  {this.recipientList()}
                </td>
              </tr>

              <tr>
                <th style={headerStyle}>Date Sent</th>
                <td colSpan="4">{formatDate(dateSent)}</td>
              </tr>

              <tr>
                <th style={headerStyle}>Last Response</th>
                <td colSpan="4">{formatDate(lastResponded)}</td>
              </tr>

              <tr>
                <th style={headerStyle}>Responses</th>
                <th style={narrowStyle}>No</th>
                <td>{no}</td>
                <th style={narrowStyle}>Yes</th>
                <td>{yes}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
        <h5 style={{ textAlign: 'center' }}>Survey {id} - Loading...</h5>
      </div>
    );
  }
}

const mapStateToProps = ({ detail }) => ({ detail });

export default connect(
  mapStateToProps,
  { fetchDetail }
)(SurveyDetail);
