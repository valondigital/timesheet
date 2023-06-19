const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = 'Valon Time Tracker <admin@valonconsultinggroup.com>';
    this.transporter = this.newTransport(); // Assign the created transport object to a property
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // sendgrid
      return 1;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const text = convert(html);

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text,
    };

    await this.transporter.sendMail(mailOptions).catch((err) => {
      console.error('Error sending email:', err);
      throw err;
    });
  }

  async sendWelcome() {
    await this.send('Welcome', 'Welcome to the Valon timesheet');
  }
};
