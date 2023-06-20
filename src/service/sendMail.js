const sendGrid = require('@sendgrid/mail');
const generateErr = require('./generateErr')

const apiKey = process.env.SENDGRID_API_KEY
const senderAccount = process.env.SENDGRID_FROM

sendGrid.setApiKey(apiKey);

const autoMail = async (to, subject, body) => {
  try {
    const mailContains = {
      to,
      from: senderAccount,
      subject,
      text: body,
      html: `
          <div>
              <h1>${subject}</h1>
              <p>${body}</p>
          </div>
          `,
    };

    await sendGrid.send(mailContains);

  } catch (err) {
    generateErr(err);
  }
};

module.exports = autoMail;