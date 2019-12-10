"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./config"));

_dotenv.default.config();

const mydebugger = (0, _debug.default)('app:startup');

const createPaymentOptions = async () => {
  const client = await _config.default.connect();
  await client.query(`INSERT INTO paymentoption (name)
    VALUES ('paynow'),('preorder');`, () => mydebugger({
    message: 'Created some paymentoptions'
  }));
  client.release();
};

createPaymentOptions();