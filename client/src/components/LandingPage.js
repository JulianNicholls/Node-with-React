import React from 'react';

const LandingPage = () => (
  <div
    className="container"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}
  >
    <div>
      <img
        src="/images/emaily-logo-tr.png"
        alt="Emaily 2018 Logo"
        style={{ display: 'inline-block', marginRight: '1rem' }}
      />
      <h2 style={{ display: 'inline-block' }}>Emaily 2018</h2>
    </div>
    <h5>Craft your own surveys and collect great feedback from your users.</h5>
  </div>
);

export default LandingPage;
