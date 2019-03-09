import moment from 'moment';

export default date => {
  const stamp = moment(date);
  const formattedDate = stamp.format('[at] LT [on] LL');

  if (moment().unix() - stamp.unix() < 15 * 86400)
    // Last fortnight
    return stamp.fromNow();

  return formattedDate;
};
