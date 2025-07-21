const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SANDGRID_API_KEY);

const sendEmail = async (options) => {
  // define options (from, to ...)
  const mailOptions = {
    from: `lsubrahmanyam1234@gmail.com`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await sgMail.send(mailOptions);
    console.log('Email sent via SendGrid');
  } catch (error) {
    console.error(
      'SendGrid Email Error:',
      error.response?.body || error.message
    );
    throw error;
  }
};

module.exports = sendEmail;
