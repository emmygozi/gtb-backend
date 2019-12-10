"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

const myDatabaseConfig = {
  database: process.env.LOCAL_DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
}; // optimize if else code with tenary shortcut

const pool = process.env.NODE_ENV === 'production' ? new _pg.Pool(process.env.DATABASE_URL) : new _pg.Pool(myDatabaseConfig);
var _default = pool;
exports.default = _default;