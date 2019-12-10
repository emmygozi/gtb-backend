"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./config"));

_dotenv.default.config();

const mydebugger = (0, _debug.default)('app:startup');

const createProduct = async () => {
  const name = process.env.PROD_NAME.split(',');
  const manufacturerid = process.env.PROD_MNR_ID;
  const quantity = process.env.PROD_QUANTITY.split(',');
  const price = process.env.PROD_PRICE.split(',');
  const client = await _config.default.connect();
  await client.query(`INSERT INTO product ( name, manufacturerid, quantity, price)
    VALUES ('${name[0]}','${manufacturerid}', '${quantity[0]}', '${price[0]}'),
    ('${name[1]}','${manufacturerid}', '${quantity[1]}', '${price[1]}'),
    ('${name[2]}','${manufacturerid}', '${quantity[2]}', '${price[2]}'),
    ('${name[3]}','${manufacturerid}', '${quantity[3]}', '${price[3]}'),
    ('${name[4]}','${manufacturerid}', '${quantity[4]}', '${price[4]}');`, () => mydebugger({
    message: 'Created some products'
  }));
  client.release();
};

createProduct();