import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import { addCredits } from '../actions/auth';

const Payments = ({ addCredits }) => {
  console.log(process.env);

  return (
    <StripeCheckout
      name="Emaily Survey Creator 2018"
      image="/images/emaily-logo-tr.png"
      description="5 credits for sending out survey emails"
      amount={500} // Pennies
      currency="USD" // For now...
      token={token => addCredits(token)}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    >
      <button className="waves-effect waves-light btn">Add Credits</button>
    </StripeCheckout>
  );
};

export default connect(
  null,
  { addCredits }
)(Payments);
