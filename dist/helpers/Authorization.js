"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

class Authorization {
  static authorize(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({
      status: 401,
      error: 'Access denied!'
    });

    try {
      const aDecodedToken = _jsonwebtoken.default.verify(token, process.env.JWT_MY_SECRET);

      req.newDecodedUser = aDecodedToken;
      next();
    } catch (ex) {
      res.status(400).json({
        status: 400,
        error: 'Invalid login details!'
      });
    }
  }

}

var _default = Authorization;
exports.default = _default;