"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("./config"));

_dotenv.default.config();

const mydebugger = (0, _debug.default)('app:startup');

const createManufacturer = async () => {
  const name = process.env.MNR_NAME;
  const email = process.env.MNR_EMAIL;
  const phoneNumber = process.env.MNR_PHONENO;
  const accountid = process.env.MNR_ACCT_ID;
  const salt = await _bcrypt.default.genSalt(10);
  const hashedPassword = await _bcrypt.default.hash(process.env.MNR_PASSWORD, salt);
  const wallet = process.env.MNR_WALLET;
  const client = await _config.default.connect();
  await client.query(`INSERT INTO manufacturer ( name, email, phoneNumber, accountid, wallet, password)
    VALUES ('${name}','${email}', '${phoneNumber}', '${accountid}', '${wallet}', '${hashedPassword}');`, () => mydebugger({
    message: 'Created some manufacturers'
  }));
  client.release();
};

createManufacturer();