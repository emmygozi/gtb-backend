import twilio from 'twilio';
import dotenv from 'dotenv';
// const twilio = require('twilio');
// const dotenv = require('dotenv');

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSms = (body, to) => {
  client.messages
    .create({
      body,
      from: process.env.DISTR_PHONENO,
      to
    })
    .then(message => console.log(message.sid));
};

export default sendSms;
