import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import { addCredits } from '../actions/auth';

const Payments = ({ addCredits }) => (
  <StripeCheckout
    name="Emaily Survey Creator 2018"
    image="/images/emaily-logo-2.png"
    description="5 credits for sending out survey emails"
    amount={500} // Pennies
    currency="USD" // For now...
    token={token => addCredits(token)}
    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
  >
    <button className="btn indigo">Add Credits</button>
  </StripeCheckout>
);

export default connect(
  null,
  { addCredits }
)(Payments);
