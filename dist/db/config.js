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
  database: 'd3bv9i666c0m7l',
  host: 'ec2-174-129-255-37.compute-1.amazonaws.com',
  user: 'kdeootgcdpkkxx',
  password: '4ee22406f9e72a39df497f96cd752efa5ebdf5c8dd5c1f3606f146d9c86d0497',
  port: 5432,
  ssl: true
}; // optimize if else code with tenary shortcut

const pool = new _pg.Pool(myDatabaseConfig);
var _default = pool;
exports.default = _default;