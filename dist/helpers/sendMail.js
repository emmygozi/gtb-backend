"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

_mail.default.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (subject, html, to) => {
  const fromEmail = process.env.SENDGRID_SENDER_EMAIL;
  const msg = {
    to,
    from: fromEmail,
    subject,
    html
  };

  _mail.default.send(msg);
};

var _default = sendMail;
exports.default = _default;