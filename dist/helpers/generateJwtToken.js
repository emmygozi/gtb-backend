"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

const generateJwtToken = (id, userIdOrMail) => {
  const token = _jsonwebtoken.default.sign({
    id,
    userIdOrMail
  }, process.env.JWT_MY_SECRET, {
    expiresIn: 86400
  });

  return token;
};

var _default = generateJwtToken;
exports.default = _default;