"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("./config"));

_dotenv.default.config();

const mydebugger = (0, _debug.default)('app:startup');

const createBank = async () => {
  const adminid = process.env.BNK_ADMINID;
  const salt = await _bcrypt.default.genSalt(10);
  const hashedPassword = await _bcrypt.default.hash(process.env.BNK_PASSWORD, salt);
  const client = await _config.default.connect();
  await client.query(`INSERT INTO bank ( adminid, password)
    VALUES ('${adminid}', '${hashedPassword}');`, () => mydebugger({
    message: 'Created the bank'
  }));
  client.release();
};

createBank();