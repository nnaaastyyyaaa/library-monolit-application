const nodemailer = require("nodemailer");

class NodemailerEmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendReservationEmail({ email, bookTitle }) {
    await this.transporter.sendMail({
      from: `"Library" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Book reservation",
      text: `You have successfully reserved "${bookTitle}"`,
    });

    console.log(`📧 Email sent to ${email}`);
  }
}

module.exports = NodemailerEmailService;
