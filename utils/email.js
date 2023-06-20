const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url, loginDetails) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = 'Valon Time Tracker <admin@valonconsultinggroup.com>';
    this.transporter = this.newTransport();
    this.loginDetails = loginDetails; // Assign the created transport object to a property
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp-relay.sendinblue.com',
    //   port: 587,
    //   auth: {
    //     user: 'ayomoses111@gmail.com',
    //     pass: 'xsmtpsib-69491b3f0bb7c7a8ea50deaec757eb7d87906ae9197f63d727240b62d38b8881-HNSWYvyQ9nsCBwz7',
    //   },
    // });
    // return transporter;
    // }
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
      loginDetails: this.loginDetails,
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

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
