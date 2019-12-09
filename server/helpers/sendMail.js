import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (subject, html, to) => {
  const fromEmail = process.env.SENDGRID_SENDER_EMAIL;
  const msg = {
    to,
    from: fromEmail,
    subject,
    html,
  };
  sgMail.send(msg);
};

export default sendMail;
