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

const pool = new _pg.Pool('postgres://vcdzyehokpoxoh:2629c272309b311fe103e2a3b10f15ba8c22f7c5f2f336314c69445adc35719b@ec2-174-129-254-223.compute-1.amazonaws.com:5432/d1rne15fmjc0fp');
var _default = pool;
exports.default = _default;