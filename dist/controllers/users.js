"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _debug = _interopRequireDefault(require("debug"));

var _config = _interopRequireDefault(require("../db/config"));

var _generateJwtToken = _interopRequireDefault(require("../helpers/generateJwtToken"));

var _mailGen = require("../helpers/mailGen");

const mydebugger = (0, _debug.default)('app:startup');

class Users {
  static async distrSignup(req, res) {
    const {
      name,
      email,
      logourl,
      userid,
      password,
      accountid,
      location
    } = req.body;
    const emailSearchQuery = {
      text: 'SELECT email FROM distributors WHERE email=$1',
      values: [`${email}`],
      rowMode: 'array'
    };
    const accountSearchQuery = {
      text: 'SELECT accountid FROM distributors WHERE accountid=$1',
      values: [`${accountid}`],
      rowMode: 'array'
    };
    const isAlreadyRegistered = await _config.default.query(emailSearchQuery);
    const isValidAccount = await _config.default.query(accountSearchQuery);

    if (isAlreadyRegistered.rows.length > 0) {
      return res.status(409).json({
        status: 409,
        error: `A distributor with '${email}' is already registered`
      });
    }

    if (isValidAccount.rows.length < 1) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid account ID or user ID'
      });
    }

    const salt = await _bcrypt.default.genSalt(10);
    const hashedPassword = await _bcrypt.default.hash(password, salt);
    const {
      rows
    } = await _config.default.query(`INSERT INTO distributors ( name, email, logourl, userid, password, accountid, location )
    VALUES ('${name}', '${email}', '${logourl}', '${userid}', '${hashedPassword}', ${accountid}
    , '${location}' ) RETURNING id, 
    name, email, logourl, userid, accountid, location`);
    (0, _mailGen.distrSignupMail)(email, name);
    const token = (0, _generateJwtToken.default)(rows[0].id, rows[0].userid);
    mydebugger(token);
    res.status(201).json({
      status: 201,
      data: [{
        token,
        user: rows[0]
      }]
    });
  }

  static async distrLogin(req, res) {
    const {
      userid,
      password
    } = req.body;
    const userExistOrNot = {
      text: 'SELECT id, userid, password FROM distributors WHERE userid=$1',
      values: [`${userid}`],
      rowMode: 'array'
    };
    const {
      rows
    } = await _config.default.query(userExistOrNot);

    if (rows.length < 1) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid user ID or password'
      });
    }

    const databasePassword = rows[0][2];
    const isValidPassword = await _bcrypt.default.compare(password, databasePassword);
    if (!isValidPassword) return res.status(400).json({
      status: 400,
      error: 'Invalid user ID or password'
    });
    const token = (0, _generateJwtToken.default)(rows[0][0], rows[0][1]);
    res.status(200).json({
      status: 200,
      data: [{
        token,
        user: {
          id: rows[0][0],
          userid: rows[0][1]
        }
      }]
    });
  }

  static async manufacturerLogin(req, res) {
    const {
      email,
      password
    } = req.body;
    const userExistOrNot = {
      text: 'SELECT id, email, password FROM manufacturer WHERE email=$1',
      values: [`${email}`],
      rowMode: 'array'
    };
    const {
      rows
    } = await _config.default.query(userExistOrNot);

    if (rows.length < 1) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email or password'
      });
    }

    const databasePassword = rows[0][2];
    const isValidPassword = await _bcrypt.default.compare(password, databasePassword);
    if (!isValidPassword) return res.status(400).json({
      status: 400,
      error: 'Invalid email or password'
    });
    const token = (0, _generateJwtToken.default)(rows[0][0], rows[0][1]);
    res.status(200).json({
      status: 200,
      data: [{
        token,
        user: {
          id: rows[0][0],
          email: rows[0][1]
        }
      }]
    });
  }

  static async bankLogin(req, res) {
    const {
      adminid,
      password
    } = req.body;
    const userExistOrNot = {
      text: 'SELECT id, adminid, password FROM bank WHERE adminid=$1',
      values: [`${adminid}`],
      rowMode: 'array'
    };
    const {
      rows
    } = await _config.default.query(userExistOrNot);

    if (rows.length < 1) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid admin ID or password'
      });
    }

    const databasePassword = rows[0][2];
    const isValidPassword = await _bcrypt.default.compare(password, databasePassword);
    if (!isValidPassword) return res.status(400).json({
      status: 400,
      error: 'Invalid admin ID or password'
    });
    const token = (0, _generateJwtToken.default)(rows[0][0], rows[0][1]);
    res.status(200).json({
      status: 200,
      data: [{
        token,
        user: {
          id: rows[0][0],
          adminid: rows[0][1]
        }
      }]
    });
  }

  static async distributorLogin(req, res) {
    const {
      userid,
      password
    } = req.body;
    const userExistOrNot = {
      text: 'SELECT id, userid, password FROM distributors WHERE userid=$1',
      values: [`${userid}`],
      rowMode: 'array'
    };
    const {
      rows
    } = await _config.default.query(userExistOrNot);

    if (rows.length < 1) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid user ID or password'
      });
    }

    const databasePassword = rows[0][2];
    const isValidPassword = await _bcrypt.default.compare(password, databasePassword);
    if (!isValidPassword) return res.status(400).json({
      status: 400,
      error: 'Invalid user ID or password'
    });
    const token = (0, _generateJwtToken.default)(rows[0][0], rows[0][1]);
    res.status(200).json({
      status: 200,
      data: [{
        token,
        user: {
          id: rows[0][0],
          userid: rows[0][1]
        }
      }]
    });
  }

}

var _default = Users;
exports.default = _default;