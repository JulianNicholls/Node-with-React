import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchSurveys } from '../../actions';
import formatDate from '../../utils/dates';

const smallInfo = { fontSize: '0.85em', color: 'rgba(255, 255, 255, 0.8)' };
const indented = { display: 'inline-block', marginLeft: '2rem' };

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderCard = ({ dateSent, _id, title, subject, body, yes, no }) => {
    return (
      <Link to={`/survey/${_id}`} key={_id}>
        <div className="card purple darken-4">
          <div className="card-content white-text">
            <span className="card-title">{title}</span>
            <p>
              <span style={smallInfo}>Subject:</span> {subject}
            </p>
            <p>
              <span style={smallInfo}>Question:</span> {body}
            </p>
            <p className="right" style={smallInfo}>
              Sent {formatDate(dateSent)}
            </p>
          </div>

          <div className="card-action white-text">
            <span style={indented}>Yes:</span>{' '}
            <span className="yellow-text">{yes}</span>
            <span style={indented}>No:</span>{' '}
            <span className="yellow-text">{no}</span>
          </div>
        </div>
      </Link>
    );
  };

  render() {
    const { surveys } = this.props;

    return surveys.reverse().map(survey => this.renderCard(survey));
  }
}

const mapStateToProps = ({ surveys }) => ({ surveys });

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
