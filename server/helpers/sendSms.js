// import twilio from 'twilio';
// import dotenv from 'dotenv';
const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.messages
  .create({
    body: 'Hackathon text message... ',
    from: '+18179526744',
    to: '+2349065609629'
  })
  .then(message => console.log(message.sid));
