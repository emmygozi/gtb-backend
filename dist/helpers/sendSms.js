"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _twilio = _interopRequireDefault(require("twilio"));

var _dotenv = _interopRequireDefault(require("dotenv"));

// const twilio = require('twilio');
// const dotenv = require('dotenv');
_dotenv.default.config();

const client = (0, _twilio.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSms = (body, to) => {
  client.messages.create({
    body,
    from: process.env.DISTR_PHONENO,
    to
  }).then(message => console.log(message.sid));
};

var _default = sendSms;
exports.default = _default;