import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends React.Component {
  collectToken = token => {
    console.log(token);
  };

  render() {
    return (
      <StripeCheckout
        name="Emaily Survey Creator 2018"
        image="/images/emaily-logo-tr.png"
        description="5 credits for sending out survey emails"
        amount={500} // Pennies
        currency="USD" // For now...
        token={this.collectToken}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <button className="waves-effect waves-light btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default Payments;
