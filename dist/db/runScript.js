"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

var _config = _interopRequireDefault(require("./config"));

var _databaseScript = _interopRequireDefault(require("./databaseScript"));

const mydebugger = (0, _debug.default)('app:startup');

const dropAndRecreateTables = async () => {
  const client = await _config.default.connect();
  await client.query(_databaseScript.default, () => mydebugger({
    message: 'Dropped and Recreated all tables'
  }));
  client.release();
};

dropAndRecreateTables();