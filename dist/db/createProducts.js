"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./config"));

_dotenv.default.config();

const mydebugger = (0, _debug.default)('app:startup');

const createProducts = async () => {
  const name = process.env.PRODUCT_NAME.split(',');
  const quantity = process.env.PRODUCT_QUANTITY.split(',');
  const distributorid = process.env.PRODUCT_DIST_ID.split(',');
  const price = process.env.PRODUCT_PRICE.split(',');
  const client = await _config.default.connect();
  await client.query(`INSERT INTO product ( name, quantity, distributorid, price)
    VALUES ('${name[0]}','${quantity[0]}', '${distributorid[0]}', '${price[0]}'),
    ('${name[1]}','${quantity[1]}', '${distributorid[1]}', '${price[1]}'),
    ('${name[1]}','${quantity[1]}', '${distributorid[1]}', '${price[1]}'),;`, () => mydebugger({
    message: 'Created some products'
  }));
  client.release();
};

createProducts();