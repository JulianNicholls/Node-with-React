const { redirectDomain } = require('../../config/keys');

module.exports = ({ body, id }) => {
  return `
  <html>
  <body style="background: #BFE9FD; color: #014B83" >
    <div style="text-align: center">
      <h2>Please help us by answering the following question</h2>
      <h4>${body}</h4>
      <div style="float: left; margin-left: 40%; background: #338437; padding: 15px 20px; font-size: 150%">
        <a style="color: white; text-decoration: none" href="${redirectDomain}/api/surveys/${id}/yes">
          Yes
        </a>
      </div>
      <div style="float: left; margin-left: 20px; background: #D32F2F; padding: 15px 20px; font-size: 150%">
        <a style="color: white; text-decoration: none" href="${redirectDomain}/api/surveys/${id}/no">
          No
        </a>
      </div>
    </div>
  </body>
  </html>
  `;
};
