import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchSurveys } from '../../actions';

const smallInfo = { fontSize: '85%', color: '#ccc' };

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderCard = ({ dateSent, _id, title, subject, body, yes, no }) => {
    const stamp = moment(dateSent);
    let dateDisplay = stamp.format('[at] LT [on] LL');

    if (moment().unix() - stamp.unix() < 15 * 86400)
      // Last fortnight
      dateDisplay = stamp.fromNow();

    return (
      <div key={_id} className="card purple darken-4">
        <div className="card-content white-text">
          <span className="card-title">{title}</span>
          <p>
            <span style={smallInfo}>Subject:</span> {subject}
          </p>
          <p>
            <span style={smallInfo}>Question:</span> {body}
          </p>
          <p className="right" style={smallInfo}>
            Sent {dateDisplay}
          </p>
        </div>
        <div className="card-action">
          <a>Yes: {yes}</a>
          <a>No: {no}</a>
        </div>
      </div>
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
