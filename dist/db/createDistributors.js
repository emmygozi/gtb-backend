"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("./config"));

_dotenv.default.config();

const mydebugger = (0, _debug.default)('app:startup');

const createDistributors = async () => {
  const name = process.env.DISTR_NAME.split(',');
  const email = process.env.DISTR_EMAIL;
  const logourl = process.env.DISTR_LOGO_URL.split(',');
  const userid = process.env.DISTR_USERID.split(',');
  const accountid = process.env.DISTR_ACCT_ID.split(',');
  const location = process.env.DISTR_LOCATION;
  const phoneno = process.env.DISTR_PHONENO;
  const salt = await _bcrypt.default.genSalt(10);
  const hashedPassword = await _bcrypt.default.hash(process.env.DISTR_PASSWORD, salt);
  const client = await _config.default.connect();
  mydebugger(logourl);
  await client.query(`INSERT INTO distributors ( name, email, logourl, userid, password, accountid, location,phoneNumber)
    VALUES ('${name[0]}','${email}','${logourl[0]}', '${userid[0]}', '${hashedPassword}','${accountid[0]}','${location}','${phoneno}'),
    ('${name[1]}','${email}','${logourl[1]}', '${userid[1]}', '${hashedPassword}','${accountid[1]}','${location}','${phoneno}'),
    ('${name[2]}','${email}','${logourl[2]}', '${userid[2]}', '${hashedPassword}','${accountid[2]}','${location}','${phoneno}'),
    ('${name[3]}','${email}','${logourl[3]}', '${userid[3]}', '${hashedPassword}','${accountid[3]}','${location}','${phoneno}'),
    ('${name[4]}','${email}','${logourl[4]}', '${userid[4]}', '${hashedPassword}','${accountid[4]}','${location}','${phoneno}');`, () => mydebugger({
    message: 'Created some distributors'
  }));
  client.release();
};

createDistributors();