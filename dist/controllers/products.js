"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../db/config"));

class Products {
  static async getProductByDistributor(req, res) {
    const {
      distributorid
    } = req.body;
    const {
      rows
    } = await _config.default.query(`select * from product where distributorid=${distributorid}`);
    res.status(200).json({
      status: 200,
      data: rows
    });
  }

}

var _default = Products;
exports.default = _default;